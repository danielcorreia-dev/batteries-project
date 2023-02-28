type itemsTypes = {
  title: string;
};

const FooterItem = (props: itemsTypes) => {
  const { title } = props;
  return (
    <div>
        <h2 className="text-4xl font-bold text-red-500">{title}</h2>
      <ul>
        <li>
          team
        </li>
        <li>
          github
        </li>
        <li>
          contact
        </li>
      </ul>
    </div>
  );
};

export default FooterItem;
