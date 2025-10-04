# Convert all images in current directory to Base64 data URIs
# Output will be in base64-images.txt

$outputFile = "base64-images.txt"
$imageExtensions = @("*.png", "*.jpg", "*.jpeg", "*.gif")

# Clear output file
"# Base64 Encoded Images for Twine" | Out-File $outputFile -Encoding UTF8
"# Copy and paste these into your Twine story" | Out-File $outputFile -Append -Encoding UTF8
"" | Out-File $outputFile -Append -Encoding UTF8

foreach ($ext in $imageExtensions) {
    $images = Get-ChildItem $ext -ErrorAction SilentlyContinue
    
    foreach ($image in $images) {
        Write-Host "Converting: $($image.Name)"
        
        # Read image as bytes
        $imageBytes = [System.IO.File]::ReadAllBytes($image.FullName)
        
        # Convert to Base64
        $base64 = [System.Convert]::ToBase64String($imageBytes)
        
        # Determine MIME type
        $mimeType = switch ($image.Extension.ToLower()) {
            ".png"  { "image/png" }
            ".jpg"  { "image/jpeg" }
            ".jpeg" { "image/jpeg" }
            ".gif"  { "image/gif" }
            default { "image/png" }
        }
        
        # Create data URI
        $dataUri = "data:$mimeType;base64,$base64"
        
        # Write to output file
        "## $($image.Name)" | Out-File $outputFile -Append -Encoding UTF8
        "File: $($image.Name)" | Out-File $outputFile -Append -Encoding UTF8
        "Size: $([math]::Round($image.Length/1KB, 2)) KB" | Out-File $outputFile -Append -Encoding UTF8
        "Data URI:" | Out-File $outputFile -Append -Encoding UTF8
        $dataUri | Out-File $outputFile -Append -Encoding UTF8
        "" | Out-File $outputFile -Append -Encoding UTF8
        
        Write-Host "  -> Size: $([math]::Round($image.Length/1KB, 2)) KB"
    }
}

Write-Host "`nConversion complete! Check $outputFile" -ForegroundColor Green
Write-Host "`nTo use in Twine, replace:" -ForegroundColor Yellow
Write-Host '  <img src="filename.png">' -ForegroundColor Cyan
Write-Host "with:" -ForegroundColor Yellow
Write-Host '  <img src="data:image/png;base64,...">' -ForegroundColor Cyan
