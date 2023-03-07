
//https://dev.to/franciscomendes10866/image-upload-to-cloudinary-with-node-js-523o//better
//https://medium.com/@joeeasy_/uploading-images-to-cloudinary-using-multer-and-expressjs-f0b9a4e14c54
//https://blog.bitsrc.io/api-upload-file-to-cloudinary-with-node-js-a16da3e747f7


const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");



//global configs

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
  
});



const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "AUTH",
    public_id: (req, file) =>{
      const filenameArr = file?.originalname?.split(".")
      filenameArr.pop()
       return new Date().toISOString().replace(/[:.]/g, "-") + "-" + filenameArr;

    }
     
  },
});

const upload = multer({ storage });

// usage:
// app.post("/", upload.single("picture"), async (req, res) => {
//   return res.json({ picture: req.file.path });
// });


//uploads if you already have a file path//not sent in file for sec reasons//N/A
//can use it with base64 string from FileReader or URL.createObjectURL string sent from frontend
const uploadImage = async (imagePath) => {
  const options = {
    folder: "auth",
    width: 250,
    height: 250,
    // use_filename: true, //use filename as public id
    //   unique_filename: false,
    //   overwrite: true,
  };

  try {

    if(!imagePath) return null;
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);
    return result.public_id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/** ------------------DELETE IMAGE-------------- */
const removeImage = async (publicId) => {
  try {
    if (!publicId) return null;
    // Upload the image
    const result = await cloudinary.uploader.destroy(publicId);
    // console.log(result);
    return result;
  } catch (error) {
    return null;
    // console.error(error);
  }
};

/**----------------------FETCH IMAGE & TRANSFORM IT---------------------------------- */
//takes the id, fetches the image and transform it before it is displayed
const createImageUrl = (publicId) => {
  // Creates an HTML image tag/url instead with a transformation that
  // results in a circular thumbnail crop of the image
  // focused on the faces
  // transformations applied to the URL
  //eg Output: "https://res.cloudinary.com/demo/image/upload/w_100,h_150,c_fill/sample.jpg"
  let imageUrl = cloudinary.url(publicId, {
    transformation: [
      {
        width: 250,
        height: 250,
        gravity: "faces",
        crop: "thumb",
      },

      { radius: "max" },
      { effect: "outline:10" },
    ],
  });

  // let imageTag = cloudinary.image("sample.jpg") would output a html img tag:
  //eg //<img src="https://res.cloudinary.com/demo/image/upload/c_fill,h_500,w_500/v1573726751/docs/casual" alt="Casual Jacket">
  //so you just add it in react as {imageTag}//can't be used in avatar

  return imageUrl;
};

module.exports = {
  createImageUrl,
  removeImage,
  uploadImage,
  upload,
};


//  // Set the image to upload
//   const imagePath =
//     "https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg";

//   // Upload the image
//   const publicId = await uploadImage(imagePath);

//   // Get the colors in the image
//   const colors = await getAssetInfo(publicId);

//   // Create an image tag, using two of the colors in a transformation
//   const imageUrl = await createImageUrl(publicId);