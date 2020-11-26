const path = require("path");
const fs = require("fs");
const siteFolder = "./desintranet/"
let files = [];

// these items give false positives. If a script element contains any of these words, we will let it pass
// if you find new items, be sure to check them back in 
let excludes = ["yammer", "gtm.start", "intranet", "?a=", "i,s,o,g,r,a,m", "<!--",
    "fonts.googleapis", "platform.twitter.com", 
    /* you can add site specific stuff here if needed */
     siteFolder]

// this is just a simple recurse directories and get a list of files.
function recurseDirectories(directory) {
    fs.readdirSync(directory).forEach(file => {
        const absolute = path.join(directory, file)
        if (fs.statSync(absolute).isDirectory())
            return recurseDirectories(absolute)
        else
            return files.push(absolute);
    });
}

recurseDirectories(siteFolder);

files.forEach(f => {

    // we only look at html files
    if (f.indexOf(".html") == -1)
        return;

    // get the file contents
    var contents = fs.readFileSync(f, 'utf8')
    //split the file into lines
    var lines = contents.split("\n")
    // iterate the lines
    lines.forEach(line => {
        // remove white space
        line = line.trim()

        // first we'll do the script elements
        if (line.indexOf("<script") >= 0
            && line.indexOf("src=") >= 0
            && line.indexOf("integrity") == -1) { // these are three qualifications

            // if we find one of our exclude terms, we'll set 'exclude' to true
            let exclude = false
            excludes.forEach(excludeTerm => {
                if (line.indexOf(excludeTerm) >= 0)
                    exclude = exclude || true
            })
            if (exclude) {
                return; // go to next file
            } else {
                // print out the file name and line, use these for the report
                console.log(f, ":" , line)
            }
        }

        // now we'll do the link elements for css files
        // uses the same algorithms as above
        if (line.indexOf("<link") >= 0
            && line.indexOf("href=") >= 0
            && line.indexOf("stylesheet") >= 0
            && line.indexOf("integrity") == -1) { // these are three qualifications
            let exclude = false
            excludes.forEach(excludeTerm => {
                if (line.indexOf(excludeTerm) >= 0)
                    exclude = exclude || true
            })
            if (!exclude) {
                console.log(f, ":", line)
            }
        }
    })
}) 
