
// NOTE : Use npm run start:dev to start



import express, { response } from 'express';
import fs from 'fs';

const app = express();

const PORT = process.env.PORT || 3000;

// Route handler to filter JSON data based on URL parameters
app.get('/filter', (req, res) => {
    const { type, week , day , time , dish } = req.query;
    fs.readFile("data.json", function(err, data) { 
    
      // Check for errors 
      if (err) throw err; 
  
      // Converting to JSON 
      const users = JSON.parse(data); 
      console.log(users); // Print users
      
      let filteredData = users;



    // Filter based on 'type' paramet
    if (type) {
        filteredData = { [type]: filteredData[type] };
    }




    if (week) {
        for (const typeKey in filteredData) {
            if (Object.hasOwnProperty.call(filteredData, typeKey)) {
                for (const weekKey in filteredData[typeKey]) {
                    if (Object.hasOwnProperty.call(filteredData[typeKey], weekKey)) {
                        if (weekKey !== week) {
                            delete filteredData[typeKey][weekKey];
                        }
                        
                    }
                }
            }
        }
    }





    // Filter based on 'day' parameter
    if (day) {
        for (const typeKey in filteredData) {
            if (Object.hasOwnProperty.call(filteredData, typeKey)) {
                for (const weekKey in filteredData[typeKey]) {
                    if (Object.hasOwnProperty.call(filteredData[typeKey], weekKey)) {
                        for (const dayKey in filteredData[typeKey][weekKey]) {

                            if (dayKey !== day) {
                                delete filteredData[typeKey][weekKey][dayKey];
                            }
                        }
                        
                    }
                }
            }
        }
    }


    if (time) {
        for (const typeKey in filteredData) {
            if (Object.hasOwnProperty.call(filteredData, typeKey)) {
                for (const weekKey in filteredData[typeKey]) {
                    if (Object.hasOwnProperty.call(filteredData[typeKey], weekKey)) {
                        for (const dayKey in filteredData[typeKey][weekKey]) {
 
                            if (Object.hasOwnProperty.call(filteredData[typeKey][weekKey], dayKey)) {

                                for (const timeKey in filteredData[typeKey][weekKey][dayKey]){
                                    if (timeKey !== time) {
                                        delete filteredData[typeKey][weekKey][dayKey][timeKey];
                                    }


                                }

                            }
                        }
                        
                    }
                }
            }
        }
    }

    
    if (dish) {
        for (const typeKey in filteredData) {
            if (Object.hasOwnProperty.call(filteredData, typeKey)) {
                for (const weekKey in filteredData[typeKey]) {
                    if (Object.hasOwnProperty.call(filteredData[typeKey], weekKey)) {
                        for (const dayKey in filteredData[typeKey][weekKey]) {
 
                            if (Object.hasOwnProperty.call(filteredData[typeKey][weekKey], dayKey)) {

                                for (const timeKey in filteredData[typeKey][weekKey][dayKey]){
                                   
                                    if(Object.hasOwnProperty.call(filteredData[typeKey][weekKey][dayKey] , timeKey)){

                                        
                                                const updatedLunchMenu = filteredData[typeKey][weekKey][dayKey][timeKey].filter(dishj => dishj === dish);
                                                filteredData[typeKey][weekKey][dayKey][timeKey] = updatedLunchMenu;

                                    }

                                }

                            }
                        }
                        
                    }
                }
            }
        }
    }

    res.json(filteredData);
});  }); 







app.listen(PORT , () => {
  console.log(`Running on Port ${PORT} `);
});