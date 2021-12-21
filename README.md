# sri-audit

clone the repository. 

extract the zip file of the static backus into the same directory

delete everything in the __data directory

you can remove binary files with a powershell command:

    get-childitem * -recurse -include  *.pdf, *.doc, *.docx, *.dot, *.dotx, *.ppt, *.pptx, *.potx, *.xls, *.xlsx, *.xlsm, *.jpg, *.jpeg, *.png, *.png, *.gif, *.bmp, *.svg, *.svg@v=*, *.tif, *.tiff, *.ico, *.ico@, *.ico@*, *.mp3, *.zip, *.csv, *.mp4, *.mpeg, *.wmv, *.otf, *.oft, *.mdb, *.msg, *.eot, *.eot@, *.eot@v=*, *.ttf, *.ttf@v=*, *.woff, *.woff@*, *.woff2, *.woff2@*, *.pps, *.ppsx, *.ics, *.lyr, *.rm, *.kml, *.gpx, *.avi | remove-item -recurse -verbose

pay attention to the lines of app.js marked "TODO", but please don't commit back changes to this

run app.js with node

    >node app.js

Or set up a launch taks in visual studio code
