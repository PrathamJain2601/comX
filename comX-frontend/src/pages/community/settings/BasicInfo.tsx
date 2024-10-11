'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Users, FileText, Image, Hash, Key, Calendar } from 'lucide-react'

export default function BasicInformation() {
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [description, setDescription] = useState('')

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <Card className="w-full h-full rounded-none border-none flex items-center">
        <CardContent className="space-y-6 w-full">
          <div className="space-y-2">
            <Label htmlFor="communityName" className="flex items-center text-sm font-medium">
              <Users className="mr-2 h-4 w-4" />
              Community Name
            </Label>
            <Input
              id="communityName"
              placeholder="Vercel"
              className="w-full transition-all duration-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="communityDescription" className="flex items-center text-sm font-medium">
              <FileText className="mr-2 h-4 w-4" />
              Community Description
            </Label>
            <Textarea
              id="communityDescription"
              placeholder="Describe your community"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[100px] transition-all duration-300 focus:ring-2 focus:ring-blue-500"
              style={{ height: `${Math.max(100, description.split('\n').length * 20)}px` }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage" className="flex items-center text-sm font-medium">
              <Image className="mr-2 h-4 w-4" />
              Cover Image
            </Label>
            <div className="flex items-center space-x-4">
              <Input
                id="coverImage"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full"
              />
              {coverImage && (
                <img
                  src={coverImage}
                  alt="Cover"
                  className="w-16 h-16 object-cover rounded-md animate-fade-in"
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="communityId" className="flex items-center text-sm font-medium">
              <Hash className="mr-2 h-4 w-4" />
              Community ID
            </Label>
            <Input
              id="communityId"
              value="12345"
              readOnly
              className="w-full bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="joinCode" className="flex items-center text-sm font-medium">
              <Key className="mr-2 h-4 w-4" />
              Join Code
            </Label>
            <Input
              id="joinCode"
              value="VERCEL2023"
              readOnly
              className="w-full bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="createdAt" className="flex items-center text-sm font-medium">
              <Calendar className="mr-2 h-4 w-4" />
              Created At
            </Label>
            <Input
              id="createdAt"
              type="date"
              value="2023-06-01"
              readOnly
              className="w-full bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </>
  )
}