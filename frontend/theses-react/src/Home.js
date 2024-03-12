// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "./NavBar";
const Home = () => {
    // const  history = useHistory();
   
//     const handleSubmit = (e) => {
//     e.preventDefault();
//     history.push('/get-thesis-data');
//    }

    return ( 
        <div className="home">
            <header>
                <h2>Theses Vault</h2>
            </header>
            
            <section className ="banner">
                <div className="welcome-banner">
                 <div className="welcome">
                  <h2>Welcome to <span>Theses Vault</span></h2>
                 </div>
                </div>
                
            </section>
            <NavBar/>
            <main>
                <article>
                    <h2>Unlock Knowledge, Explore Theses Vault</h2>
                    <p>
                    Embark on an academic odyssey through Theses Vault, our comprehensive website, where a treasure trove of scientific research fields awaits exploration. With links to detailed PDFs sourced from ShodhGanga, our platform caters to a diverse range of disciplines, ranging from groundbreaking studies in biology to pioneering developments in engineering. Delve into the intricate realms of environmental science, computer technology, social psychology, and explore the depths of physics, uncovering the latest advancements and groundbreaking discoveries.

                    Navigate effortlessly through our curated collection of thesis PDFs, each offering valuable insights and knowledge at your fingertips. Whether you're a budding scholar, seasoned researcher, or simply curious about the latest trends in scientific exploration, Theses Vault provides a gateway to endless possibilities. From unraveling the mysteries of quantum mechanics to exploring the wonders of astrophysics, our website serves as a beacon for those hungry for knowledge. Join us on a journey of discovery as we unravel the mysteries of the universe one thesis at a time.
                    </p>
                    <p>The purpose of Theses Vault is to serve as a comprehensive platform for accessing and exploring academic research in various fields. By providing links to detailed PDFs sourced from ShodhGanga and other reputable sources, Theses Vault aims to facilitate easy access to valuable research materials for scholars, researchers, students, and enthusiasts alike. Our website strives to promote knowledge dissemination and foster intellectual curiosity by offering a diverse range of theses covering topics across science, technology, engineering, mathematics, social sciences, humanities, and more. Additionally, users can track their browsing history and revisit previously accessed theses, allowing for seamless navigation and personalized research experiences. Whether users are seeking to deepen their understanding of specific subjects, stay updated on the latest research trends, or embark on academic endeavors, Theses Vault aims to be their trusted destination for accessing quality scholarly content.</p>
                </article>
                <div className="image-container">
                 <ul className="images">
                   <li><img src="https://media.sciencephoto.com/image/f0298055/800wm/F0298055-Covid-19_coronavirus_binding_to_human_cell,_illustration.jpg" alt="virus" /></li>
                   <li><img src="https://scitechdaily.com/images/Animated-Atom-Physics-Model-Fast.gif" alt="Atom" /></li>
                 </ul>
                </div>
            </main>
            <section className= "login-now">
                <h2>So login now  and start exploring!</h2>
                <p>
                Charting new territories of academic exploration, Theses Vault is your compass to a world of scholarly riches. Immerse yourself in a realm where curiosity thrives and discoveries await at every turn. With a commitment to excellence and a passion for learning, we invite you to join us on a journey of intellectual discovery unlike any other. Let Theses Vault be your gateway to unlocking the secrets of knowledge and fueling your thirst for discovery. Explore, learn, and thrive with us as we redefine the boundaries of academic exploration together
                </p>
            </section>
            <footer>
                <p className="copyright">Copyright 2024  Theses Vault</p>
            </footer>
        </div>
     );
}
 
export default Home;