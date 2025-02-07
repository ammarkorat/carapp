/* Scroll to top button */
.scroll-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #002438;
    color: white;
    padding: 10px 15px;
    border-radius: 50%;
    border: none;
    font-size: 20px;
    cursor: pointer;
    display: none;
    transition: opacity 0.3s ease;
}

.scroll-to-top:hover {
    background-color: #004064;
}

/* Mobile navigation toggle */
#nav-toggle {
    display: none;
    background-color: #002438;
    color: white;
    padding: 10px;
    border: none;
    font-size: 18px;
}

nav.active {
    display: block;
}

/* For mobile screens */
@media screen and (max-width: 768px) {
    nav {
        display: none;
        flex-direction: column;
        align-items: center;
    }

    #nav-toggle {
        display: block;
    }

    nav a {
        margin: 10px 0;
    }
}
