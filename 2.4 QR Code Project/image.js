import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
        message: "Enter the path to the image file you want to convert to a QR code:",
        name: "imagePath",
    }
  ])
  .then((answers) => {
    console.log(answers);
    const imagePath = answers.imagePath;

    // Read the image file
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        console.error("Error reading the image file:", err);
      } else {
        // Convert the image data to a QR code
        const qr_png = qr.image(data, { type: 'png' });

        // Pipe the QR code image to a file
        qr_png.pipe(fs.createWriteStream('qr_code.png'));

        console.log("QR code generated and saved as qr_code.png.");
      }
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
