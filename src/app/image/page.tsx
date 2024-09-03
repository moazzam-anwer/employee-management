'use client';
import Image from "next/image";
import React from "react";
import bird from '../../../public/bird.jpg';


const ImagePage = () => {
    return (
        <div>
            <h1>This is a Bird Image</h1>
            <Image src={bird} alt="Bird" width={300} height={300} /> 

            <style jsx>{`
                h1 {
                    text-align: center;
                }
                p {
                    text-align: center;
                }
            `}</style>
            
        </div>
    );
};

export default ImagePage;