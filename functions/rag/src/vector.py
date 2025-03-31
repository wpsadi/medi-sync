import os
import io
from pymongo import MongoClient
from langchain.embeddings import GoogleGenerativeAIEmbeddings
from langchain.vectorstores import MongoDBAtlas
from langchain.document_loaders import TextLoader, PyMuPDFLoader, Docx2txtLoader, UnstructuredPPTXLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from appwrite.client import Client
from appwrite.services.storage import Storage
from appwrite import query

# Appwrite Configuration
APPWRITE_ENDPOINT = os.environ["APPWRITE_FUNCTION_API_ENDPOINT"]
APPWRITE_PROJECT_ID = os.environ["APPWRITE_FUNCTION_PROJECT_ID"]
APPWRITE_API_KEY =os.environ["APPWRITE_PROJECT_API_KEY"]
APPWRITE_BUCKET_ID = os.environ["APPWRITE_RECORD_PDFS_BUCKET_ID"]

client = Client()
client.set_endpoint(APPWRITE_ENDPOINT).set_project(APPWRITE_PROJECT_ID).set_key(APPWRITE_API_KEY)
storage = Storage(client)

# MongoDB Configuration
MONGO_URI = os.environ["MONGO_URI"]
MONGO_DB_NAME = "vector_db"
MONGO_COLLECTION_NAME = "embeddings"
mongo_client = MongoClient(MONGO_URI)
db = mongo_client[MONGO_DB_NAME]
collection = db[MONGO_COLLECTION_NAME]

# Set up Gemini API key
# os.environ["GOOGLE_API_KEY"] = "your_gemini_api_key"

# Initialize embedding model
embedding_model = GoogleGenerativeAIEmbeddings()
vector_db = MongoDBAtlas(mongo_collection=collection, embedding_function=embedding_model)

def fetch_user_files(user_id):
    """Fetch files for a specific user from Appwrite."""
    files = storage.list_files(bucket_id=APPWRITE_BUCKET_ID)
    if "files" not in files:
        raise ValueError("No files found in the bucket.")
    user_files = [file for file in files["files"] if file["userId"] == user_id]
    return user_files

def load_document(file_path, file_type):
    """Load document based on file type."""
    if file_type == "txt":
        return TextLoader(file_path).load()
    elif file_type == "pdf":
        return PyMuPDFLoader(file_path).load()
    elif file_type == "docx":
        return Docx2txtLoader(file_path).load()
    elif file_type == "pptx":
        return UnstructuredPPTXLoader(file_path).load()
    else:
        raise ValueError("Unsupported file type")

def process_and_store_files(user_id):
    """Process and store embeddings for user files."""
    user_files = fetch_user_files(user_id)
    documents = []
    for file in user_files:
        file_path = f"/tmp/{file['name']}"
        file_type = file["name"].split(".")[-1]
        
        with open(file_path, "wb") as f:
            f.write(storage.get_file_download(APPWRITE_BUCKET_ID, file["$id"]))
        
        docs = load_document(file_path, file_type)
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
        split_docs = text_splitter.split_documents(docs)
        for doc in split_docs:
            doc.metadata["userId"] = user_id
            doc.metadata["docId"] = file["$id"]
        documents.extend(split_docs)
    
    vector_db.add_documents(documents)
    print("User documents processed and stored successfully.")

def delete_document(user_id, doc_id):
    """Delete a document embedding from the database."""
    vector_db.delete([{"userId": user_id, "docId": doc_id}])
    print(f"Deleted document {doc_id} for user {user_id}")

def query_rag(user_id, question, top_k=3):
    """Retrieve relevant documents for a query within user's context."""
    results = vector_db.similarity_search(question, k=top_k, filter={"userId": user_id})
    return results

# Serverless Function Example
if __name__ == "__main__":
    user_id = "some_user_id"
    process_and_store_files(user_id)
    results = query_rag(user_id, "What is in my documents?")
    for res in results:
        print(res.page_content)
    delete_document(user_id, "some_doc_id")
