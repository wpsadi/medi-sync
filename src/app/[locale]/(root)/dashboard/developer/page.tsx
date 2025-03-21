"use client"

import { AlertTriangle, ArrowLeft, Check, Copy, Eye, EyeOff, FileText,Key, Lock, Plus, Trash } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Sidebar } from "@/components/dashboard/sidebar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample API keys
const apiKeys = [
  {
    id: "api_key_1",
    name: "Production API Key",
    key: "ms_prod_a1b2c3d4e5f6g7h8i9j0",
    created: "Mar 15, 2025",
    lastUsed: "2 hours ago",
  },
  {
    id: "api_key_2",
    name: "Development API Key",
    key: "ms_dev_z9y8x7w6v5u4t3s2r1q0",
    created: "Mar 10, 2025",
    lastUsed: "1 day ago",
  },
]

// Sample OAuth clients
const oauthClients = [
  {
    id: "oauth_1",
    name: "Mobile App Integration",
    clientId: "medi_sync_mobile_12345",
    clientSecret: "cs_67890abcdef12345ghijklmnop",
    created: "Mar 5, 2025",
    redirectUris: ["https://mobile.medi-sync.com/callback"],
  },
]

export default function DeveloperPage() {
  const [activeTab, setActiveTab] = useState("api-keys")
  const [showNewKeyDialog, setShowNewKeyDialog] = useState(false)
  const [showNewOAuthDialog, setShowNewOAuthDialog] = useState(false)
  const [showKeyDialog, setShowKeyDialog] = useState(false)
  const [showSecretDialog, setShowSecretDialog] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")
  const [newOAuthName, setNewOAuthName] = useState("")
  const [newOAuthRedirectUri, setNewOAuthRedirectUri] = useState("")
  const [newKey, setNewKey] = useState("")
  const [newClientId, setNewClientId] = useState("")
  const [newClientSecret, setNewClientSecret] = useState("")
  const [showSecret, setShowSecret] = useState(false)

  const router = useRouter()

  const handleCreateApiKey = () => {
    if (!newKeyName.trim()) return

    // Generate a random API key
    const generatedKey = `ms_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`
    setNewKey(generatedKey)
    setShowNewKeyDialog(false)
    setShowKeyDialog(true)

    toast.success("API key created")
  }

  const handleCreateOAuthClient = () => {
    if (!newOAuthName.trim() || !newOAuthRedirectUri.trim()) return

    // Generate random client ID and secret
    const generatedClientId = `medi_sync_${Math.random().toString(36).substring(2, 10)}`
    const generatedClientSecret = `cs_${Math.random().toString(36).substring(2, 30)}`

    setNewClientId(generatedClientId)
    setNewClientSecret(generatedClientSecret)
    setShowNewOAuthDialog(false)
    setShowSecretDialog(true)

    toast({
      title: "OAuth client created",
      description: "Your new OAuth client has been created successfully.",
    })
  }

  const handleCopyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${type} copied to clipboard`)
  }

  const handleDeleteApiKey = (keyId: string) => {
    toast.info("API key deleted")
  }

  const handleDeleteOAuthClient = (clientId: string) => {
    toast.info("OAuth client deleted")
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <DashboardHeader />

          <div className="mb-6">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Developer Settings</CardTitle>
                <CardDescription>Manage API keys and OAuth clients for integrating with Medi-Sync</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="api-keys" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="api-keys" className="flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      API Keys
                    </TabsTrigger>
                    <TabsTrigger value="oauth" className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      OAuth Clients
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="api-keys" className="space-y-6 pt-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium">Your API Keys</h3>
                        <p className="text-sm text-muted-foreground">
                          Use these keys to authenticate requests with the Medi-Sync API
                        </p>
                      </div>
                      <Button onClick={() => setShowNewKeyDialog(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create API Key
                      </Button>
                    </div>

                    {apiKeys.length > 0 ? (
                      <div className="border rounded-md overflow-hidden">
                        <div className="bg-muted px-4 py-2 flex items-center font-medium">
                          <div className="w-1/3">Name</div>
                          <div className="w-1/3">Created</div>
                          <div className="w-1/4">Last Used</div>
                          <div className="w-1/12"></div>
                        </div>
                        <div className="divide-y">
                          {apiKeys.map((apiKey) => (
                            <div key={apiKey.id} className="px-4 py-3 flex items-center">
                              <div className="w-1/3">
                                <div className="font-medium">{apiKey.name}</div>
                                <div className="text-sm text-muted-foreground flex items-center">
                                  <span className="font-mono">•••••••••••••••••••••</span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 ml-1"
                                    onClick={() => handleCopyToClipboard(apiKey.key, "API key")}
                                  >
                                    <Copy className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </div>
                              <div className="w-1/3 text-sm text-muted-foreground">{apiKey.created}</div>
                              <div className="w-1/4 text-sm text-muted-foreground">{apiKey.lastUsed}</div>
                              <div className="w-1/12 flex justify-end">
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteApiKey(apiKey.id)}>
                                  <Trash className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="border rounded-md p-8 text-center">
                        <Key className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No API keys yet</h3>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                          You haven't created any API keys yet. Create one to start integrating with the Medi-Sync API.
                        </p>
                        <Button onClick={() => setShowNewKeyDialog(true)}>
                          <Plus className="mr-2 h-4 w-4" />
                          Create API Key
                        </Button>
                      </div>
                    )}

                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">API Key Security</h4>
                          <p className="text-sm text-muted-foreground">
                            Your API keys carry many privileges, so be sure to keep them secure. Don't share your API
                            keys in publicly accessible areas such as GitHub, client-side code, or in API requests over
                            unencrypted connections.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="oauth" className="space-y-6 pt-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium">OAuth Clients</h3>
                        <p className="text-sm text-muted-foreground">
                          Manage OAuth clients for third-party applications
                        </p>
                      </div>
                      <Button onClick={() => setShowNewOAuthDialog(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create OAuth Client
                      </Button>
                    </div>

                    {oauthClients.length > 0 ? (
                      <div className="border rounded-md overflow-hidden">
                        <div className="bg-muted px-4 py-2 flex items-center font-medium">
                          <div className="w-1/3">Name</div>
                          <div className="w-1/3">Client ID</div>
                          <div className="w-1/4">Created</div>
                          <div className="w-1/12"></div>
                        </div>
                        <div className="divide-y">
                          {oauthClients.map((client) => (
                            <div key={client.id} className="px-4 py-3 flex items-center">
                              <div className="w-1/3">
                                <div className="font-medium">{client.name}</div>
                                <div className="text-xs text-muted-foreground">{client.redirectUris.join(", ")}</div>
                              </div>
                              <div className="w-1/3">
                                <div className="text-sm font-mono">{client.clientId}</div>
                                <div className="flex items-center mt-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 px-2 text-xs"
                                    onClick={() => {
                                      setNewClientId(client.clientId)
                                      setNewClientSecret(client.clientSecret)
                                      setShowSecretDialog(true)
                                    }}
                                  >
                                    <Eye className="h-3 w-3 mr-1" />
                                    View credentials
                                  </Button>
                                </div>
                              </div>
                              <div className="w-1/4 text-sm text-muted-foreground">{client.created}</div>
                              <div className="w-1/12 flex justify-end">
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteOAuthClient(client.id)}>
                                  <Trash className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="border rounded-md p-8 text-center">
                        <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No OAuth clients yet</h3>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                          You haven't created any OAuth clients yet. Create one to enable third-party applications to
                          access Medi-Sync data.
                        </p>
                        <Button onClick={() => setShowNewOAuthDialog(true)}>
                          <Plus className="mr-2 h-4 w-4" />
                          Create OAuth Client
                        </Button>
                      </div>
                    )}

                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">OAuth Documentation</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Learn how to implement OAuth 2.0 authentication with Medi-Sync in your applications.
                          </p>
                          <Button variant="link" className="h-auto p-0 text-sm">
                            View OAuth Documentation
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Create API Key Dialog */}
      <AlertDialog open={showNewKeyDialog} onOpenChange={setShowNewKeyDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create API Key</AlertDialogTitle>
            <AlertDialogDescription>
              Create a new API key to authenticate requests to the Medi-Sync API.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="key-name">API Key Name</Label>
              <Input
                id="key-name"
                placeholder="e.g., Production API Key"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">Give your API key a name to remember what it's used for.</p>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleCreateApiKey} disabled={!newKeyName.trim()}>
              Create API Key
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Create OAuth Client Dialog */}
      <AlertDialog open={showNewOAuthDialog} onOpenChange={setShowNewOAuthDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create OAuth Client</AlertDialogTitle>
            <AlertDialogDescription>Create a new OAuth client for third-party applications.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="oauth-name">Client Name</Label>
              <Input
                id="oauth-name"
                placeholder="e.g., Mobile App Integration"
                value={newOAuthName}
                onChange={(e) => setNewOAuthName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="redirect-uri">Redirect URI</Label>
              <Input
                id="redirect-uri"
                placeholder="e.g., https://example.com/callback"
                value={newOAuthRedirectUri}
                onChange={(e) => setNewOAuthRedirectUri(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                The URI where users will be redirected after authorization.
              </p>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCreateOAuthClient}
              disabled={!newOAuthName.trim() || !newOAuthRedirectUri.trim()}
            >
              Create OAuth Client
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* API Key Created Dialog */}
      <AlertDialog open={showKeyDialog} onOpenChange={setShowKeyDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>API Key Created</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="flex items-center gap-2 text-amber-500 mb-2">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">This API key will only be shown once.</span>
              </div>
              Make sure to copy your API key now. You won't be able to see it again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <div className="relative">
                <Input id="api-key" value={newKey} readOnly className="pr-20 font-mono text-sm" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => handleCopyToClipboard(newKey, "API key")}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Created on {new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction>
              <Check className="mr-2 h-4 w-4" />
              I've Saved My API Key
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* OAuth Client Credentials Dialog */}
      <AlertDialog open={showSecretDialog} onOpenChange={setShowSecretDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>OAuth Client Credentials</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="flex items-center gap-2 text-amber-500 mb-2">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">The client secret will only be shown once.</span>
              </div>
              Make sure to copy your client credentials now. You won't be able to see the client secret again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="client-id">Client ID</Label>
              <div className="relative">
                <Input id="client-id" value={newClientId} readOnly className="pr-20 font-mono text-sm" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => handleCopyToClipboard(newClientId, "Client ID")}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="client-secret">Client Secret</Label>
              <div className="relative">
                <Input
                  id="client-secret"
                  type={showSecret ? "text" : "password"}
                  value={newClientSecret}
                  readOnly
                  className="pr-20 font-mono text-sm"
                />
                <div className="absolute right-0 top-0 h-full flex">
                  <Button variant="ghost" size="icon" className="h-full" onClick={() => setShowSecret(!showSecret)}>
                    {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-full"
                    onClick={() => handleCopyToClipboard(newClientSecret, "Client Secret")}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Created on {new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction>
              <Check className="mr-2 h-4 w-4" />
              I've Saved My Credentials
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

