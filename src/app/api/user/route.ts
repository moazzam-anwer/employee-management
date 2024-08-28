// app/api/users/route.ts
import dbConnect from '@/app/lib/dbConnect';
import UserModel from '@/app/model/UserList'

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

    const user = await UserModel.findById(userId);
    if (user) {
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
  try { 
    const newUser = await request.json();
    const userData = await UserModel.create({
      name:newUser.name,
      description:newUser.description
    })

    return NextResponse.json({message: "User created"},{status: 201});
  } catch (err: any) {
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
      description: updateObject.description
    }
    const updatedUser = await UserModel.findOneAndUpdate({_id:id}, updatedUserData);
    
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
