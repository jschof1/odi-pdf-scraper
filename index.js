const fs = require("fs");
const pdf = require("pdf-parse");

// loop through all files in directory
// fs.readdirSync("./Report-PDFs/").forEach((file) => {
//   let dataBuffer = fs.readFileSync("./Report-PDFs/" + file);
//   let count = 1

//     pdf(dataBuffer).then(function (data) {
//         // number of pages
//         console.log(data.numpages);
//         // number of rendered pages
//         console.log(data.numrender);
//         // PDF info
//         console.log(data.info);
//         // PDF metadata
//         console.log(data.metadata);
//         // PDF.js version
//         // check https://mozilla.github.io/pdf.js/getting_started/
//         console.log(data.version);
//         // PDF text
//         console.log(data.text);
//     // get all text from pdf and create one file with all different reports numbering each report
//     fs.appendFile("./Report-Text/" + count + ".txt", data.text, function (err) {
//     });
// });
//     // fs.writeFileSync("combined.txt", data.text);
// })

function renderPage(pageData) {
  // This will be called for each page.
  let render_options = {
    normalizeWhitespace: false,
    disableCombineTextItems: false
    };
    return pageData.getTextContent(render_options)
    .then(function(textContent) {
        let lastY, text = '';
        for (let item of textContent.items) {
            if (lastY == item.transform[5] || !lastY) {
            text += item.str;
            } else {
            text += '' + item.str;
            }
            lastY = item.transform[5];
        }
        return text;
        }
    );
}

function renderPages(pdfDoc) {
    let countPromises = [];
    for(let i = 1; i <= pdfDoc.numPages; i++) {
        countPromises.push(pdfDoc.getPage(i).then(renderPage));
    }
    return Promise.all(countPromises);
}



// let dataBuffer = fs.readFileSync("./Report-PDFs/#OPEN ODI research fellow Report_ Digital planning and its implications_Aug 2021.pdf");
// pdf(dataBuffer).then(function (data) {
//     renderPages(data).then(function(pages) {
//        console.log(pages)
//     });
// }
// );

