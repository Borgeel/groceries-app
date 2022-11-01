function Footer({ items }) {
  return (
    <footer className="fixed-bottom bg-dark text-white text-center p-1">
      <span>{`You currently have ${items.length} ${
        items.length === 1 ? "item" : "items"
      }`}</span>
    </footer>
  );
}

export default Footer;
