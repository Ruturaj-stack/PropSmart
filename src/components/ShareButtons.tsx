import {
  WhatsappShareButton,
  TwitterShareButton,
  FacebookShareButton,
  WhatsappIcon,
  TwitterIcon,
  FacebookIcon,
} from "react-share";
import { Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

/**
 * Social Share Buttons Component
 * Share property on WhatsApp, Twitter, Facebook, or copy link
 */
const ShareButtons = ({ url, title, description = "" }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Property link copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <WhatsappShareButton url={url} title={title}>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg hover:opacity-80 transition-opacity">
          <WhatsappIcon size={36} round />
        </div>
      </WhatsappShareButton>

      <TwitterShareButton url={url} title={title}>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg hover:opacity-80 transition-opacity">
          <TwitterIcon size={36} round />
        </div>
      </TwitterShareButton>

      <FacebookShareButton url={url} quote={title}>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg hover:opacity-80 transition-opacity">
          <FacebookIcon size={36} round />
        </div>
      </FacebookShareButton>

      <Button variant="outline" size="sm" onClick={copyLink} className="gap-2">
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            Copied!
          </>
        ) : (
          <>
            <Link2 className="h-4 w-4" />
            Copy Link
          </>
        )}
      </Button>
    </div>
  );
};

export default ShareButtons;
