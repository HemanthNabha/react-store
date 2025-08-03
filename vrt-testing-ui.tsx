"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GitBranch, Globe, TestTube, Loader2, Sparkles, Zap, Rocket } from "lucide-react"

export default function VRTTestingUI() {
  // Flow 1 state - Updated for single GitHub URL with two branches
  const [flow1Data, setFlow1Data] = useState({
    githubUrl: "",
    baseBranch: "",
    testBranch: "",
  })
  const [flow1Branches, setFlow1Branches] = useState<string[]>([])
  const [flow1Loading, setFlow1Loading] = useState(false)

  // Flow 2 state
  const [flow2Data, setFlow2Data] = useState({
    baseUrl: "",
    testUrl: "",
  })

  // Flow 3 state
  const [flow3Data, setFlow3Data] = useState({
    url: "",
    githubUrl: "",
    selectedBranch: "",
  })
  const [flow3Branches, setFlow3Branches] = useState<string[]>([])
  const [flow3Loading, setFlow3Loading] = useState(false)

  // Add these state variables after the existing state declarations
  const [testResults, setTestResults] = useState<{
    baseImage: string
    testImage: string
    diffImage: string
    status: "idle" | "loading" | "success" | "error"
    error?: string
  } | null>(null)

  // Simulate fetching branches from GitHub
  const fetchBranches = async (githubUrl: string, type: "flow1" | "flow3") => {
    if (!githubUrl) return

    let setLoading: (loading: boolean) => void
    let setBranches: (branches: string[]) => void

    switch (type) {
      case "flow1":
        setLoading = setFlow1Loading
        setBranches = setFlow1Branches
        break
      case "flow3":
        setLoading = setFlow3Loading
        setBranches = setFlow3Branches
        break
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      const mockBranches = ["main", "develop", "feature/new-ui", "hotfix/bug-123", "release/v2.0"]
      setBranches(mockBranches)
      setLoading(false)
    }, 1500)
  }

  const handleFlow1Submit = async () => {
    console.log("Flow 1 submitted:", flow1Data)

    // Set loading state
    setTestResults({
      baseImage: "",
      testImage: "",
      diffImage: "",
      status: "loading",
    })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock response with placeholder images
      setTestResults({
        baseImage: "/placeholder.svg?height=400&width=600&text=Base+Screenshot",
        testImage: "/placeholder.svg?height=400&width=600&text=Test+Screenshot",
        diffImage: "/placeholder.svg?height=400&width=600&text=Difference+Highlighted",
        status: "success",
      })
    } catch (error) {
      setTestResults({
        baseImage: "",
        testImage: "",
        diffImage: "",
        status: "error",
        error: "Failed to run comparison",
      })
    }
  }

  const handleFlow2Submit = async () => {
    console.log("Flow 2 submitted:", flow2Data)

    setTestResults({
      baseImage: "",
      testImage: "",
      diffImage: "",
      status: "loading",
    })

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))

      setTestResults({
        baseImage: "/placeholder.svg?height=400&width=600&text=Production+Screenshot",
        testImage: "/placeholder.svg?height=400&width=600&text=Staging+Screenshot",
        diffImage: "/placeholder.svg?height=400&width=600&text=Visual+Differences",
        status: "success",
      })
    } catch (error) {
      setTestResults({
        baseImage: "",
        testImage: "",
        diffImage: "",
        status: "error",
        error: "Failed to run comparison",
      })
    }
  }

  const handleFlow3Submit = async () => {
    console.log("Flow 3 submitted:", flow3Data)

    setTestResults({
      baseImage: "",
      testImage: "",
      diffImage: "",
      status: "loading",
    })

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))

      setTestResults({
        baseImage: "/placeholder.svg?height=400&width=600&text=Reference+URL+Screenshot",
        testImage: "/placeholder.svg?height=400&width=600&text=GitHub+Branch+Screenshot",
        diffImage: "/placeholder.svg?height=400&width=600&text=Mixed+Test+Differences",
        status: "success",
      })
    } catch (error) {
      setTestResults({
        baseImage: "",
        testImage: "",
        diffImage: "",
        status: "error",
        error: "Failed to run comparison",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 via-purple-500/20 to-pink-500/20"></div>
      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
              Visual Regression Testing
            </h1>
            <div className="p-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          <p className="text-xl text-white/90 font-medium">
            Compare visual differences across different environments and branches
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-white/20 rounded-lg">
                <TestTube className="w-6 h-6" />
              </div>
              VRT Testing Flows
            </CardTitle>
            <CardDescription className="text-white/90 text-lg">
              Choose your testing approach and configure the comparison parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="flow1" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-blue-100 to-purple-100 p-1 rounded-xl">
                <TabsTrigger
                  value="flow1"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg font-semibold"
                >
                  <GitBranch className="w-4 h-4" />
                  GitHub Comparison
                </TabsTrigger>
                <TabsTrigger
                  value="flow2"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-teal-600 data-[state=active]:text-white rounded-lg font-semibold"
                >
                  <Globe className="w-4 h-4" />
                  URL Comparison
                </TabsTrigger>
                <TabsTrigger
                  value="flow3"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 to-red-600 data-[state=active]:text-white rounded-lg font-semibold"
                >
                  <TestTube className="w-4 h-4" />
                  Mixed Testing
                </TabsTrigger>
              </TabsList>

              {/* Flow 1: Single GitHub URL + Two Branch selections */}
              <TabsContent value="flow1" className="space-y-6 mt-6">
                <div className="grid gap-6">
                  {/* GitHub Repository Section */}
                  <div className="space-y-4 p-6 border-2 border-indigo-200 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-100 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg">
                        <GitBranch className="w-5 h-5 text-white" />
                      </div>
                      <Badge className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white border-0 px-4 py-1 text-sm font-semibold">
                        GitHub Repository
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="github-url-1" className="text-indigo-800 font-semibold text-sm">
                        GitHub Repository URL
                      </Label>
                      <Input
                        id="github-url-1"
                        placeholder="https://github.com/username/repository"
                        value={flow1Data.githubUrl}
                        onChange={(e) => setFlow1Data({ ...flow1Data, githubUrl: e.target.value })}
                        onBlur={() => fetchBranches(flow1Data.githubUrl, "flow1")}
                        className="border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white/80"
                      />
                    </div>
                  </div>

                  {/* Branch Selection Section */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Base Branch */}
                    <div className="space-y-4 p-6 border-2 border-emerald-200 rounded-xl bg-gradient-to-br from-emerald-50 to-green-100 shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg">
                          <GitBranch className="w-5 h-5 text-white" />
                        </div>
                        <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0 px-4 py-1 text-sm font-semibold">
                          Base Branch
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="base-branch-select-1" className="text-emerald-800 font-semibold text-sm">
                          Select Base Branch
                        </Label>
                        <Select
                          value={flow1Data.baseBranch}
                          onValueChange={(value) => setFlow1Data({ ...flow1Data, baseBranch: value })}
                          disabled={flow1Branches.length === 0}
                        >
                          <SelectTrigger className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 bg-white/80">
                            <SelectValue placeholder={flow1Loading ? "Loading branches..." : "Select base branch"} />
                          </SelectTrigger>
                          <SelectContent>
                            {flow1Loading ? (
                              <div className="flex items-center justify-center p-3">
                                <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />
                              </div>
                            ) : (
                              flow1Branches.map((branch) => (
                                <SelectItem key={branch} value={branch}>
                                  <div className="flex items-center gap-2">
                                    <GitBranch className="w-4 h-4 text-emerald-600" />
                                    <span className="font-medium">{branch}</span>
                                  </div>
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Test Branch */}
                    <div className="space-y-4 p-6 border-2 border-blue-200 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                          <GitBranch className="w-5 h-5 text-white" />
                        </div>
                        <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 px-4 py-1 text-sm font-semibold">
                          Test Branch
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="test-branch-select-1" className="text-blue-800 font-semibold text-sm">
                          Select Test Branch
                        </Label>
                        <Select
                          value={flow1Data.testBranch}
                          onValueChange={(value) => setFlow1Data({ ...flow1Data, testBranch: value })}
                          disabled={flow1Branches.length === 0}
                        >
                          <SelectTrigger className="border-blue-300 focus:border-blue-500 focus:ring-blue-500 bg-white/80">
                            <SelectValue placeholder={flow1Loading ? "Loading branches..." : "Select test branch"} />
                          </SelectTrigger>
                          <SelectContent>
                            {flow1Loading ? (
                              <div className="flex items-center justify-center p-3">
                                <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                              </div>
                            ) : (
                              flow1Branches.map((branch) => (
                                <SelectItem key={branch} value={branch}>
                                  <div className="flex items-center gap-2">
                                    <GitBranch className="w-4 h-4 text-blue-600" />
                                    <span className="font-medium">{branch}</span>
                                  </div>
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleFlow1Submit}
                    className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-bold py-4 text-lg shadow-xl transform hover:scale-105 transition-all duration-200"
                    size="lg"
                    disabled={
                      !flow1Data.githubUrl ||
                      !flow1Data.baseBranch ||
                      !flow1Data.testBranch ||
                      testResults?.status === "loading"
                    }
                  >
                    {testResults?.status === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Running Test...
                      </>
                    ) : (
                      <>
                        <Rocket className="w-5 h-5 mr-2" />
                        Start Branch Comparison
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>

              {/* Flow 2: Two URL inputs */}
              <TabsContent value="flow2" className="space-y-6 mt-6">
                <div className="grid gap-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4 p-6 border-2 border-green-200 rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                          <Globe className="w-5 h-5 text-white" />
                        </div>
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-4 py-1 text-sm font-semibold">
                          Production
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="base-url-2" className="text-green-800 font-semibold text-sm">
                          Base URL
                        </Label>
                        <Input
                          id="base-url-2"
                          placeholder="https://production.example.com"
                          value={flow2Data.baseUrl}
                          onChange={(e) => setFlow2Data({ ...flow2Data, baseUrl: e.target.value })}
                          className="border-green-300 focus:border-green-500 focus:ring-green-500 bg-white/80"
                        />
                      </div>
                    </div>
                    <div className="space-y-4 p-6 border-2 border-orange-200 rounded-xl bg-gradient-to-br from-orange-50 to-yellow-100 shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-lg">
                          <Globe className="w-5 h-5 text-white" />
                        </div>
                        <Badge className="bg-gradient-to-r from-orange-500 to-yellow-600 text-white border-0 px-4 py-1 text-sm font-semibold">
                          Staging
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="test-url-2" className="text-orange-800 font-semibold text-sm">
                          Test URL
                        </Label>
                        <Input
                          id="test-url-2"
                          placeholder="https://staging.example.com"
                          value={flow2Data.testUrl}
                          onChange={(e) => setFlow2Data({ ...flow2Data, testUrl: e.target.value })}
                          className="border-orange-300 focus:border-orange-500 focus:ring-orange-500 bg-white/80"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleFlow2Submit}
                    className="w-full bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 hover:from-green-600 hover:via-teal-600 hover:to-blue-600 text-white font-bold py-4 text-lg shadow-xl transform hover:scale-105 transition-all duration-200"
                    size="lg"
                    disabled={!flow2Data.baseUrl || !flow2Data.testUrl || testResults?.status === "loading"}
                  >
                    {testResults?.status === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Running Test...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        Compare URLs
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>

              {/* Flow 3: One URL + GitHub URL + Branch */}
              <TabsContent value="flow3" className="space-y-6 mt-6">
                <div className="grid gap-6">
                  <div className="space-y-4 p-6 border-2 border-purple-200 rounded-xl bg-gradient-to-br from-purple-50 to-pink-100 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 px-4 py-1 text-sm font-semibold">
                        Reference URL
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="url-3" className="text-purple-800 font-semibold text-sm">
                        Reference URL
                      </Label>
                      <Input
                        id="url-3"
                        placeholder="https://example.com"
                        value={flow3Data.url}
                        onChange={(e) => setFlow3Data({ ...flow3Data, url: e.target.value })}
                        className="border-purple-300 focus:border-purple-500 focus:ring-purple-500 bg-white/80"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 p-6 border-2 border-indigo-200 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-100 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg">
                        <GitBranch className="w-5 h-5 text-white" />
                      </div>
                      <Badge className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white border-0 px-4 py-1 text-sm font-semibold">
                        GitHub Repository
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="github-url-3" className="text-indigo-800 font-semibold text-sm">
                        GitHub Repository URL
                      </Label>
                      <Input
                        id="github-url-3"
                        placeholder="https://github.com/username/repository"
                        value={flow3Data.githubUrl}
                        onChange={(e) => setFlow3Data({ ...flow3Data, githubUrl: e.target.value })}
                        onBlur={() => fetchBranches(flow3Data.githubUrl, "flow3")}
                        className="border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white/80"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="branch-select-3" className="text-indigo-800 font-semibold text-sm">
                        Select Branch
                      </Label>
                      <Select
                        value={flow3Data.selectedBranch}
                        onValueChange={(value) => setFlow3Data({ ...flow3Data, selectedBranch: value })}
                        disabled={flow3Branches.length === 0}
                      >
                        <SelectTrigger className="border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white/80">
                          <SelectValue placeholder={flow3Loading ? "Loading branches..." : "Select a branch"} />
                        </SelectTrigger>
                        <SelectContent>
                          {flow3Loading ? (
                            <div className="flex items-center justify-center p-3">
                              <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
                            </div>
                          ) : (
                            flow3Branches.map((branch) => (
                              <SelectItem key={branch} value={branch}>
                                <div className="flex items-center gap-2">
                                  <GitBranch className="w-4 h-4 text-indigo-600" />
                                  <span className="font-medium">{branch}</span>
                                </div>
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={handleFlow3Submit}
                    className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white font-bold py-4 text-lg shadow-xl transform hover:scale-105 transition-all duration-200"
                    size="lg"
                    disabled={
                      !flow3Data.url ||
                      !flow3Data.githubUrl ||
                      !flow3Data.selectedBranch ||
                      testResults?.status === "loading"
                    }
                  >
                    {testResults?.status === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Running Test...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Run Mixed Testing
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Results Section */}
        {testResults && (
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm mt-8">
            <CardHeader className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-white/20 rounded-lg">
                  {testResults.status === "loading" ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : testResults.status === "success" ? (
                    <Sparkles className="w-6 h-6" />
                  ) : (
                    <TestTube className="w-6 h-6" />
                  )}
                </div>
                {testResults.status === "loading"
                  ? "Running Visual Regression Test..."
                  : testResults.status === "success"
                    ? "Test Results"
                    : "Test Failed"}
              </CardTitle>
              <CardDescription className="text-white/90 text-lg">
                {testResults.status === "loading"
                  ? "Please wait while we capture and compare screenshots"
                  : testResults.status === "success"
                    ? "Visual comparison completed successfully"
                    : "An error occurred during testing"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {testResults.status === "loading" && (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <TestTube className="w-8 h-8 text-blue-500" />
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-gray-700">Processing screenshots...</p>
                  <p className="text-sm text-gray-500">This may take a few moments</p>
                </div>
              )}

              {testResults.status === "error" && (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="p-4 bg-red-100 rounded-full">
                    <TestTube className="w-12 h-12 text-red-500" />
                  </div>
                  <p className="text-lg font-semibold text-red-700">Test Failed</p>
                  <p className="text-sm text-red-500">{testResults.error}</p>
                  <Button
                    onClick={() => setTestResults(null)}
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                  >
                    Try Again
                  </Button>
                </div>
              )}

              {testResults.status === "success" && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Base Image Card */}
                    <div className="space-y-4 p-6 border-2 border-emerald-200 rounded-xl bg-gradient-to-br from-emerald-50 to-green-100 shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg">
                          <Globe className="w-5 h-5 text-white" />
                        </div>
                        <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0 px-4 py-1 text-sm font-semibold">
                          Base Image
                        </Badge>
                      </div>
                      <div className="aspect-video bg-white rounded-lg overflow-hidden shadow-md">
                        <img
                          src={testResults.baseImage || "/placeholder.svg"}
                          alt="Base screenshot"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm text-emerald-700 font-medium">Original/Reference Screenshot</p>
                    </div>

                    {/* Test Image Card */}
                    <div className="space-y-4 p-6 border-2 border-blue-200 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                          <TestTube className="w-5 h-5 text-white" />
                        </div>
                        <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 px-4 py-1 text-sm font-semibold">
                          Test Image
                        </Badge>
                      </div>
                      <div className="aspect-video bg-white rounded-lg overflow-hidden shadow-md">
                        <img
                          src={testResults.testImage || "/placeholder.svg"}
                          alt="Test screenshot"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm text-blue-700 font-medium">New/Comparison Screenshot</p>
                    </div>

                    {/* Difference Image Card */}
                    <div className="space-y-4 p-6 border-2 border-purple-200 rounded-xl bg-gradient-to-br from-purple-50 to-pink-100 shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 px-4 py-1 text-sm font-semibold">
                          Differences
                        </Badge>
                      </div>
                      <div className="aspect-video bg-white rounded-lg overflow-hidden shadow-md">
                        <img
                          src={testResults.diffImage || "/placeholder.svg"}
                          alt="Difference screenshot"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm text-purple-700 font-medium">Visual Differences Highlighted</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 justify-center pt-4">
                    <Button
                      onClick={() => setTestResults(null)}
                      className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white"
                    >
                      Run New Test
                    </Button>
                    <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                      Download Report
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white">
                      Save Results
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
