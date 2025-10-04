# Organize images for Twine publication
# This script will:
# 1. Create an 'images' folder
# 2. Copy all images to that folder
# 3. Show you what path updates you need to make in Twine

Write-Host "=== Organizing Images for Twine Publication ===" -ForegroundColor Cyan

# Create images directory if it doesn't exist
$imagesDir = "images"
if (!(Test-Path $imagesDir)) {
    New-Item -ItemType Directory -Path $imagesDir | Out-Null
    Write-Host "Created '$imagesDir' folder" -ForegroundColor Green
} else {
    Write-Host "'$imagesDir' folder already exists" -ForegroundColor Yellow
}

# Image extensions to copy
$imageExtensions = @("*.png", "*.jpg", "*.jpeg", "*.gif", "*.GIF")
$copiedCount = 0

Write-Host "`nCopying images..." -ForegroundColor Cyan

foreach ($ext in $imageExtensions) {
    $images = Get-ChildItem $ext -ErrorAction SilentlyContinue
    
    foreach ($image in $images) {
        $destPath = Join-Path $imagesDir $image.Name
        
        # Only copy if not already in images folder
        if ($image.DirectoryName -ne (Get-Item $imagesDir).FullName) {
            Copy-Item $image.FullName $destPath -Force
            Write-Host "  Copied: $($image.Name)" -ForegroundColor Gray
            $copiedCount++
        }
    }
}

Write-Host "`n$copiedCount images copied to '$imagesDir' folder" -ForegroundColor Green

# List all images found
Write-Host "`n=== Image List ===" -ForegroundColor Cyan
$allImages = Get-ChildItem "$imagesDir\*" -Include $imageExtensions
foreach ($img in $allImages) {
    Write-Host "  - $($img.Name)" -ForegroundColor Gray
}

Write-Host "`n=== Next Steps ===" -ForegroundColor Yellow
Write-Host "1. Update your Twine story paths from:" -ForegroundColor White
Write-Host '   <img src="person1_safe.png">' -ForegroundColor Cyan
Write-Host "   to:" -ForegroundColor White
Write-Host '   <img src="images/person1_safe.png">' -ForegroundColor Green
Write-Host ""
Write-Host "2. When you publish your Twine story:" -ForegroundColor White
Write-Host "   - Save the HTML file (e.g., 'Pull or Let Go.html')" -ForegroundColor Gray
Write-Host "   - Make sure the 'images' folder is in the SAME directory as the HTML" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Your folder structure should look like:" -ForegroundColor White
Write-Host "   Pull or Let Go.html" -ForegroundColor Cyan
Write-Host "   images/" -ForegroundColor Cyan
Write-Host "     ├── person1_safe.png" -ForegroundColor Gray
Write-Host "     ├── person2_safe.png" -ForegroundColor Gray
Write-Host "     └── end1.GIF" -ForegroundColor Gray

Write-Host "`nDone! You can now distribute the HTML file + images folder together." -ForegroundColor Green
