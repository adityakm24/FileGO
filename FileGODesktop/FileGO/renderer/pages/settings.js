import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../firebaseConfig";
import Link from "next/link";
import styles from "./styles/Dashboard.module.css";

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const checkUserAuth = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);

        // Retrieve user data from the database
        const userSnapshot = await db
          .ref(`users/${currentUser.uid}`)
          .once("value");
        const userData = userSnapshot.val();

        // Merge user data with the user object
        setUser((prevUser) => ({
          ...prevUser,
          ...userData,
        }));

        setIsAuthenticating(false);
      } else {
        setIsAuthenticating(false);
        router.push("/home");
      }
    };

    checkUserAuth();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push("/home");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (isAuthenticating) {
    return <p>Loading...</p>;
  }

  // Convert Unix timestamps to human-readable format
  const createdOn = new Date(user.createdOn).toLocaleString();
  const lastLoggedIn = new Date(user.lastLoggedIn).toLocaleString();

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>Logo</div>
        <div className={styles.profile} onClick={handleDropdownToggle}>
          <img
            src={user.photoURL}
            alt="Profile"
            className={styles.profilePhoto}
            width={100}
            height={100}
          />

          {isDropdownOpen && (
            <div className={styles.dropdown}>
              <ul className={styles.dropdownMenu}>
                <li className={styles.dropdownMenuItem}>
                  <Link href="/settings">
                    <a>Settings</a>
                  </Link>
                </li>
                <li
                  className={styles.dropdownMenuSignOut}
                  onClick={handleSignOut}
                >
                  Sign Out
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
      <h1 className={styles.title}>Welcome to the Settings</h1>
      <p className={styles.user}>User: {user.displayName}</p>
      {/* Display additional user data from the database */}
      <p className={styles.userData}>Email: {user.email}</p>
      <p className={styles.userData}>Created On: {createdOn}</p>
      <p className={styles.userData}>Last Logged In: {lastLoggedIn}</p>

      <button className={styles.button} onClick={handleSignOut}>
        Sign Out
      </button>
      <Link href="/dashboard">
        <a className={styles.link}>Go to Home</a>
      </Link>
    </div>
  );
}
