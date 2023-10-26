import Lottie from 'lottie-react';
import facebookAnimation from '../assets/facebook.json';
import instagramAnimation from '../assets/instagram.json';
import twitterAnimation from '../assets/twitter.json';

function Footer() {
    return (
        <footer className="bg-darkpink text-white">
        <div className="container mx-auto p-2 flex justify-center items-center">
            <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mx-2"
            >
                <Lottie animationData={facebookAnimation} style={{ width: 50, height: 50 }} />
            </a>
            <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mx-2"
            >
                <Lottie animationData={instagramAnimation} style={{ width: 50, height: 50 }} />
            </a>
            <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mx-2"
            >
                <Lottie animationData={twitterAnimation} style={{ width: 50, height: 50 }} />
            </a>
      </div>
    </footer>       
    );
}

export default Footer