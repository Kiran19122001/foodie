MERN Full Stack web application
Technologies used React.js,Node.js,express.js,MongoDb,Css,Bootstrap
functionalities implemented:
      1.Registration
      2.Login
      3.Redux Store
      4.Searching
      5.Filters
      6.Pagenation
      7.Logout
      8.Navigation
      9.REST API
      10.Storing user Rigistration details in mongoDB
      11.Rending corresponding response to the client based on the request
      12.Resposive for mobile device
      
###frontend###
#Initally the routing happens and home component will besplayed
#in the home component API call will be done in the useEffect and the state will store the response.data
#mapping the stored data and displaying that in cards and making it flex-wrap
#in the navigation home,my favourites,login/register or logout ,profile based on the jwt token 
#search,filter,pagenation will be done
#navigation to the specific recipe and displaying full details like description,ingredients,image,add to favourite
#when clicked on add favouite that recipe will be stored in the redux and in the sesseion stroge also for that perticular sesseion
#in the my favouiretes component data will be fetched from the redux store using useSelector and displays all the added favourite recipes 
#Register functionality for user registration and storing the user details in the mongoDB
#login functionality by sending the data and getting the jwt from the server
#logout fuctionality by removeing the token from the local storage


###Backend###
#using express to provide the server to our app
#cors for cross origin resource sharing
#mongoose for connectiong with the mongoDB database connection
#creating the model to organise the data which will be sotred in the mongoDB cloud database
#creating routes like /register,/login for handling the post requests
#storing the data in the databse
#retriving the data from the database
#Sending the corresponding response to the client requests
