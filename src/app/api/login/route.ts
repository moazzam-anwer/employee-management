import jwt from 'jsonwebtoken';

import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

// TypeScript type for the response
type Data = {
    message: string;
  }

export async function POST(
    req: Request,
    res: NextApiResponse<Data>
  ) {
    console.log("in route login")
    const { username, password } = await req.json();
  
    // Replace this with actual authentication logic
    if (username === 'admin' && password === 'Test@123') {
      // Generate a token (e.g., JWT or any token generation logic)
      jwt.sign({username, password}, process.env.JWT_SECRET_KEY!)
      const token = jwt.sign({username, password}, process.env.JWT_SECRET_KEY!); 
      console.log("token",token)

      let response = NextResponse.next();
      response.cookies.set('authToken',token)
      console.log("cookie is set");
 
      // Send a success response
      return Response.json({message: 'Logged in successfully', token}, {"status": 200});
    //   res.status(200).json({ message: 'Logged in successfully' });
    } else {
      // Authentication failed
      return Response.json({message: 'Invalid credentials'}, {"status": 401});
    //   res.status(401).json({ message: 'Invalid credentials' });
    }
  }
