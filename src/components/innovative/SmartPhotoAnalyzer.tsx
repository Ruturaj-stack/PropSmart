import { useState } from "react";
import {
  Camera,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  CheckCircle,
  Star,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SmartPhotoAnalyzerProps {
  propertyImages: string[];
}

/**
 * Smart Photography Analysis
 * AI detects photo quality, staging, and potential issues
 */
const SmartPhotoAnalyzer = ({ propertyImages }: SmartPhotoAnalyzerProps) => {
  // Mock analysis data for each image
  const imageAnalysis = propertyImages.slice(0, 4).map((img, index) => ({
    url: img,
    qualityScore: [8.5, 7.2, 9.1, 6.8][index],
    isStaged: [false, true, false, true][index],
    isProfessional: [true, true, false, false][index],
    issues: [
      [],
      ["Overly bright"],
      ["Low resolution", "Poor lighting"],
      ["Wide angle distortion"],
    ][index],
    trustScore: [95, 85, 75, 70][index],
  }));

  const overallScore =
    imageAnalysis.reduce((sum, img) => sum + img.qualityScore, 0) /
    imageAnalysis.length;
  const trustScore =
    imageAnalysis.reduce((sum, img) => sum + img.trustScore, 0) /
    imageAnalysis.length;

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600 dark:text-green-400";
    if (score >= 6) return "text-yellow-600 dark:text-yellow-400";
    return "text-orange-600 dark:text-orange-400";
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-accent" />
          <div>
            <h3 className="font-semibold text-lg text-foreground">
              AI Photo Analysis
            </h3>
            <p className="text-sm text-muted-foreground">
              Automated quality and authenticity check
            </p>
          </div>
        </div>

        <div className="text-right">
          <div
            className={`text-2xl font-bold ${getScoreColor(trustScore / 10)}`}
          >
            {trustScore}%
          </div>
          <div className="text-xs text-muted-foreground">Trust Score</div>
        </div>
      </div>

      {/* Overall Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-3 rounded-lg bg-secondary text-center">
          <Star className="h-4 w-4 text-accent mx-auto mb-2" />
          <div className="text-lg font-bold text-foreground">
            {overallScore.toFixed(1)}/10
          </div>
          <div className="text-xs text-muted-foreground">Avg Quality</div>
        </div>
        <div className="p-3 rounded-lg bg-secondary text-center">
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-foreground">
            {imageAnalysis.filter((img) => img.isProfessional).length}/
            {imageAnalysis.length}
          </div>
          <div className="text-xs text-muted-foreground">Professional</div>
        </div>
        <div className="p-3 rounded-lg bg-secondary text-center">
          <TrendingUp className="h-4 w-4 text-accent mx-auto mb-2" />
          <div className="text-lg font-bold text-foreground">
            {imageAnalysis.filter((img) => img.isStaged).length}
          </div>
          <div className="text-xs text-muted-foreground">Staged</div>
        </div>
      </div>

      {/* Individual Image Analysis */}
      <div className="space-y-3 mb-4">
        <h4 className="text-sm font-medium text-foreground">
          Image-by-Image Analysis
        </h4>
        {imageAnalysis.map((analysis, index) => (
          <div key={index} className="flex gap-3 p-3 rounded-lg bg-secondary">
            <img
              src={analysis.url}
              alt={`Property ${index + 1}`}
              className="w-20 h-20 rounded object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  Image {index + 1}
                </span>
                <span
                  className={`text-sm font-bold ${getScoreColor(analysis.qualityScore)}`}
                >
                  {analysis.qualityScore}/10
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-2">
                {analysis.isProfessional && (
                  <Badge variant="secondary" className="gap-1">
                    <Camera className="h-3 w-3" /> Professional
                  </Badge>
                )}
                {analysis.isStaged && (
                  <Badge variant="secondary" className="gap-1">
                    <Palette className="h-3 w-3" /> Staged
                  </Badge>
                )}
              </div>

              <div className="text-sm text-foreground mb-1 font-medium">
                Detected Issues:
              </div>
              {analysis.issues.length === 0 ? (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  No Issues
                </div>
              ) : (
                <ul className="space-y-1">
                  {analysis.issues.map((issue, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-orange-600"
                    >
                      <AlertTriangle className="h-4 w-4" />
                      {issue}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Trust Assessment */}
      <div
        className={`p-4 rounded-lg ${
          trustScore >= 85
            ? "bg-green-500/10 border border-green-500/20"
            : trustScore >= 70
              ? "bg-yellow-500/10 border border-yellow-500/20"
              : "bg-orange-500/10 border border-orange-500/20"
        }`}
      >
        <div className="flex items-start gap-3">
          {trustScore >= 85 ? (
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <div className="text-sm">
              <span className="font-medium text-foreground">
                Recommendation:{" "}
              </span>
              <span
                className={`inline-flex items-center gap-1 ${
                  overallScore > 75
                    ? "text-green-600"
                    : overallScore > 50
                      ? "text-yellow-600"
                      : "text-orange-600"
                }`}
              >
                {overallScore > 75 ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    High Photo Quality
                  </>
                ) : overallScore > 50 ? (
                  <>
                    <AlertTriangle className="h-4 w-4" />
                    Moderate Quality
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-4 w-4" />
                    Verify In Person
                  </>
                )}
              </span>
            </div>
            <p className="text-xs text-foreground/80">
              {trustScore >= 85
                ? "Photos appear authentic with professional quality. Good representation of property."
                : trustScore >= 70
                  ? "Some photos show enhancement. Recommended to request additional unedited photos."
                  : "Several quality issues detected. Schedule an in-person visit for accurate assessment."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartPhotoAnalyzer;
