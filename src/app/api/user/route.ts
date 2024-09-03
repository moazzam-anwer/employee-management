// app/api/users/route.ts
import dbConnect from '@/app/lib/dbConnect';
import UserModel from '@/app/model/UserList'
import AddressModel from '@/app/model/AddressModel';


import { NextResponse } from 'next/server';

// type User = {
//   id: string;
//   name: string;
//   description: string;
// };



export async function GET(request: Request) {
  await dbConnect();
  
  console.log("in get api")
  const data = new URL(request.url).searchParams;
  // to fetch specificuser data
  if (data.get('id')) {
    const userId = data.get('id');

    const user = await UserModel.findById(userId).populate('address');
    if (user) {
      console.log("user: " , user)
      // return NextResponse.json(user);
      const response = NextResponse.json(user);
      

      // Set custom headers
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('Expires', '0');
    
      return response;
    }
    return NextResponse.json({ message: 'User not found' });
  }
  // if no id received then fetch all user data
  const users = await UserModel.find();
  console.log("users",users)
  if (users) {
    // return NextResponse.json(users);
    const response = NextResponse.json(users);

    // Set custom headers
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  
    return response;
  }
}

// POST a new User
export async function POST(request: Request) {
  await dbConnect();
  try { 
    const newUser = await request.json();
    const { name, email, address, phone, hobbies, gender } = newUser;
    if(!name || !email || !address || !phone || !hobbies || !gender) {
      return NextResponse.json({ message: 'Params are missing' },{status:400});
    }
    console.log('newUser',newUser)

      // Destructure address fields
    const { area, city, state, country, pincode } = address;

    //Transaction session to ensure both documents are created successfully
    // const session = await mongoose.startSession();
    // console.log('session',session)
    // session.startTransaction();

    try {

      // check if email and phone is unique
      const isDuplicate = await UserModel.findOne({$or: [{email}, {phone}]});

      let errorMsg : string = "";
      if(isDuplicate && isDuplicate.email == email) {
        errorMsg = "Email already exists";

      } else if(isDuplicate && isDuplicate.phone == phone) {
        errorMsg = "Phone already exists";
      }

      if(errorMsg) {
        return NextResponse.json({message: errorMsg, status:false},{status: 401});
      }
      // Step 1: Create a new Address document with the reference to the User
      const userAddress = new AddressModel({
        area,
        city,
        state,
        country,
        pincode,
        
      });

      await userAddress.save();
      
      // Step 2: Create a new User document
      const user = new UserModel({ 
        name,
        email,
        phone,
        hobbies,
        gender,
        address: userAddress._id // Reference the address _id 
      });
      await user.save();
  

      // Commit the transaction
      // await session.commitTransaction();
      // session.endSession();
      
      // Respond with the created user and address
      return NextResponse.json({message: "User created"},{status: 201});

    } catch (err) {
      
      // If any error occurs, abort the transaction and end the session
      // await session.abortTransaction();
      // session.endSession();
      console.error('Error creating user and address:', err);
      return NextResponse.json({ message: 'Internal server errors' },{status:500});
    }

  } catch (err: any) {
    console.error('Error outer catch creating user and address:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Dynamic API route handler for single user operations
export async function PUT(request: Request) {
  try { 
    console.log("in put api request")
    const data = new URL(request.url).searchParams;
    const id = data.get('id');
    console.log("id: " , id);
    const updateObject = await request.json();
    console.log("updateObject: " , updateObject);
    const updatedUserData = {
      name: updateObject.name,
      email: updateObject.email,
      phone: updateObject.phone,
      hobbies: updateObject.hobbies,
      gender: updateObject.gender,
    }
    const updatedUser = await UserModel.findOneAndUpdate({_id:id}, updatedUserData);
    if(updatedUser) {
      const updatedAddressData = {
        area :updateObject.address.area,
        city : updateObject.address.city,
        state : updateObject.address.state,
        country : updateObject.address.country,
        pincode : updateObject.address.pincode
      }
      await AddressModel.findOneAndUpdate({_id:updatedUser.address}, updatedAddressData);
    }
    
    return NextResponse.json(updatedUser,{status: 200});
  } catch (err:any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {console.log("in delete user api")
    const data = new URL(request.url).searchParams;
    const id = data.get('id');
    await UserModel.deleteOne({_id:id})
    return NextResponse.json({ message: 'User deleted' },{status: 200});
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
