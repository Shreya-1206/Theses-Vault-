import axios from "axios";
import cheerio from "cheerio";

// import connectToDb from "./db/index.js";



// const condb = connectToDb();
// console.log(condb); 


async function fetchThesisData(keyword) {
  try {
    const searchUrl = `https://shodhganga.inflibnet.ac.in/browse?type=title&starts_with=${encodeURIComponent(keyword)}`;
    const response = await axios.get(searchUrl);
    const $ = cheerio.load(response.data);
    const thesis = [];

  const table = $('.table');

   table.find('tr').each((index, element) => {
      const title = $(element).find('strong a').text().trim(); // Extract title
      const uploadDate = $(element).find('[headers="t1"]').text().trim();
      const researcher = $(element).find('[headers="t3"]').text().trim();
      const guide = $(element).find('[headers="t4"]').text().trim();
      const relativeLink = $(element).find('strong a').attr('href'); 
      const hyperLink = "https://shodhganga.inflibnet.ac.in" + relativeLink ;

      if (title && uploadDate && researcher && guide && hyperLink) {
          thesis.push({ title, uploadDate, researcher, guide, hyperLink});
      }
  });
  console.log(searchUrl);
  return thesis;
 

  }catch (error) {
    console.log("error occured while fetching data " +error)
  }
  
} 

fetchThesisData()
    .then(thesisData => {
     console.log(thesisData); 
     })
   .catch(error => {
    console.error('Error occurred while fetching data:', error);
   });


// run();
export  default fetchThesisData;
//     let title = "shreya ray";
//     let uploadDate = "12-feb-2024";
//     let researcher = "jon mike";
//     let guide = "bhavna";
//   const dbResponse =    await Thesis.create({title, uploadDate, researcher, guide});
//   console.log("Database Response", dbResponse);

  //     for (let x = 0; x<thesis.length; x++) {
  //       console.log(thesis[x].hyperLink)
  //       let title = thesis[x].title;
  //       let uploadDate = thesis[x].uploadDate;
  //       let researcher = thesis[x].researcher;
  //       let guide = thesis[x].guide;
  //       let hyperLink = thesis[x].hyperLink;
  //      await Thesis.create({title, uploadDate, researcher, guide, hyperLink});

  // }
//     const batchSize = 20; // Adjust batch size as needed
//    for (let i = 0; i < thesis.length; i += batchSize) {
//    const batch = thesis.slice(i, i + batchSize);
//    await Thesis.insertMany(batch);
//  }  
    // await Thesis.c(thesis,  { timeout: 90000 });// becoxz error came some time out
    // console.log("Thesis data saved successfully!");