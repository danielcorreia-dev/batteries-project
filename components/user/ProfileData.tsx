const ProfileData = () => {
  const tabs = [
    {}
  ];

  const links = tabs.map((tab, index) => {
    <li>
      key={index}
    </li>
  });

  return (
    <div className="border-b">
      <nav className="px-4">
        <ul className="flex">
          {}
        </ul>
      </nav>
    </div>
  );
};

export default ProfileData;
