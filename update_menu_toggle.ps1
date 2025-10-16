# PowerShell script to update HTML files with universal menu toggle script
# Run from the college-portal/public directory

$files = @("assignments.html", "attendance.html", "grievance.html", "grievance1.html", "leave.html", "leavelogs.html", "home1.html", "timetable1.html")

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Processing $file..."
        
        # Read the file content
        $content = Get-Content $file -Raw
        
        # Check if it has the old menu toggle pattern
        if ($content -match 'document\.getElementById\("menu-toggle"\)\.addEventListener\("click"') {
            # Replace the old menu toggle JavaScript
            $content = $content -replace 'document\.getElementById\("menu-toggle"\)\.addEventListener\("click", function \(\) \{\s*document\.getElementById\("nav-menu"\)\.classList\.toggle\("show"\);\s*\}\);', ''
            
            # Add the universal menu toggle script before the closing </body> tag
            if ($content -notmatch 'menu-toggle\.js') {
                $content = $content -replace '</body>', "  <!-- Universal Menu Toggle Script -->`n  <script src=`"menu-toggle.js`"></script>`n`n</body>"
            }
            
            # Write the updated content back
            $content | Out-File $file -Encoding UTF8
            Write-Host "Updated $file successfully!"
        } else {
            Write-Host "$file doesn't need menu toggle update or already updated."
        }
    } else {
        Write-Host "File $file not found."
    }
}

Write-Host "All files processed!"
