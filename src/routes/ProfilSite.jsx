import React from 'react';
import '../App.css';

// Muss noch importiert werden in Main.jsx
const ProfileSite = () => {
    const profileData = {
        name: 'John Doe',
        age: 25,
        course: 'Web Development',
        profileImage: 'path/to/profile-image.jpg',
        posts: [
            'Post 1',
            'Post 2',
            'Post 3',
            // ... add more posts here
        ],
    };

    return (
        <div>
            <img src={profileData.profileImage} alt="Profile" />
            <h1>{profileData.name}</h1>
            <p>Age: {profileData.age}</p>
            <p>Course: {profileData.course}</p>
            <h2>Last 10 Posts:</h2>
            <ul>
                {profileData.posts.slice(0, 10).map((post, index) => (
                    <li key={index}>{post}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProfileSite;
