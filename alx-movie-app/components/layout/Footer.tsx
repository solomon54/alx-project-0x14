import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
const Footer: React.FC = () => {
  return (
    <footer className="bg-[#171D22] text-white py-8 px-4 md:px-10 lg:px-20">
      <div className="flex flex-col md:flex-row justify-between items-center w-full">
        {/* Footer Logo */}
        <h2 className="text-xl md:text-4xl font-semibold mb-4 md:mb-0 ">Cine<span className="text-[#E2D609]">Seek</span></h2>

        {/* Navigation Links */}
        <nav className="flex-1 justify-center space-x-6 mb-4 md:mb-0">
          <Link href='/' className="hover:text-[#E2D609] text-lg transition-colors duration-300">Home</Link>
          <Link href='/movies' className="hover:text-[#E2D609] text-lg transition-colors duration-300">Movies</Link>
          <Link href='/Contact' className="hover:text-[#E2D609] text-lg transition-colors duration-300">contct</Link>
          <Link href='/privacy' className="hover:text-[#E2D609] text-lg transition-colors duration-300">Privacy</Link>
        </nav>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="https://twitter.com" target="_blank" rel="noopener" className="hover:text-[#E2D602]">
          <FontAwesomeIcon icon={faTwitter} size='lg' /></a>
          <a href="https://facebook.com" target="_blank" rel="noopener" className="hover:text-[#E2D602]">
            <FontAwesomeIcon icon={faFacebookF} size='lg' /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener" className="hover:text-[#E2D602]">
            <FontAwesomeIcon icon={faInstagram} size='lg' /></a>
        </div>

      </div>

      <div className="mt-8 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} CineSeek. All rights resurved.</p>
      </div>
    </footer>
  );
}

export default Footer;
