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

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: description,
          url,
        });
        toast({
          title: "Shared successfully",
          description: "Property shared with others",
        });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        toast({
          title: "Link copied!",
          description: "Share it wherever you've like",
        });
        setTimeout(() => setCopied(false), 2000);
      }

      // Track the share action in analytics
      const propertyId = url.split("/").pop() || "";
      if (propertyId) {
        try {
          await import("@/integrations/supabase/behavior").then((m) =>
            m.trackPropertyShare(propertyId),
          );
        } catch (e) {
          console.error("Tracking error:", e);
        }
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        toast({
          title: "Failed to share",
          description: "Please try again",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <WhatsappShareButton url={url} title={title}>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-600 hover:bg-green-500 hover:text-white transition-all">
          <WhatsappIcon size={32} round />
        </div>
      </WhatsappShareButton>

      <TwitterShareButton url={url} title={title}>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400/10 text-blue-500 hover:bg-blue-400 hover:text-white transition-all">
          <TwitterIcon size={32} round />
        </div>
      </TwitterShareButton>

      <FacebookShareButton url={url}>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-700 hover:bg-blue-600 hover:text-white transition-all">
          <FacebookIcon size={32} round />
        </div>
      </FacebookShareButton>

      <Button
        variant="outline"
        size="sm"
        onClick={handleShare}
        className="gap-2 rounded-xl h-10 border-accent/20 hover:border-accent hover:bg-accent/5"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-accent" />
            Copied!
          </>
        ) : (
          <>
            <Link2 className="h-4 w-4 text-accent" />
            Share Property
          </>
        )}
      </Button>
    </div>
  );
};

export default ShareButtons;
