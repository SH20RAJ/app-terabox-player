import   { useState, useEffect } from 'react';

const Downloader = () => {
  const [inputUrl, setInputUrl] = useState("");
  const searchParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    // Check URL parameters on client side
    const url = searchParams.get("url");
    if (url) {
      setInputUrl(decodeURIComponent(url)); // Decode the URL parameter
    }
  }, []);

  const handleUrlChange = (e) => {
    const url = e.target.value;
    if (isValidUrl(url)) {
      setInputUrl(url);
      // Update the URL with the input URL parameter
      const newUrl = `${window.location.pathname}?url=${encodeURIComponent(url)}`;
      window.history.pushState(null, '', newUrl);
      let id = url.split("/")[4];
      fetch("https://www.terabox.tech/api/upload?id=" + id + "&user=1");
    } else {
      alert("Please enter a valid URL.");
    }
  };

  const copyShareLink = () => {
    const currentUrl = `${window.location.origin}${window.location.pathname}?url=${encodeURIComponent(inputUrl)}`;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        alert("Share link copied to clipboard");
      })
      .catch((err) => {
        console.error("Error copying share link:", err);
      });
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (isValidUrl(text)) {
        setInputUrl(text);
        const newUrl = `${window.location.pathname}?url=${encodeURIComponent(text)}`;
        window.history.pushState(null, '', newUrl);
      } else {
        alert("The clipboard content is not a valid URL.");
      }
    } catch (err) {
      console.error("Error pasting from clipboard:", err);
    }
  };

  const isValidUrl = (url) => {
    return 1+ url
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-5 py-24">
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div className="relative   p-6 rounded-lg shadow-lg max-w-md w-full">
       

        <input
          id="input-url"
          placeholder="Enter Terabox URL"
          type="text"
          value={inputUrl}
          onChange={handleUrlChange}
          className="flex bg-transparent  text-white h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <div className="buttons mt-10 flex ">
           <button
          className=" border-white border m-2 text-white p-4 w-full  bg-black inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          onClick={pasteFromClipboard}
        >
          Paste URL
        </button>

        <button
          className=" border-white border m-2 text-white p-4 w-full  bg-black inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          onClick={copyShareLink}
        >
          Copy Share Link
        </button>
        </div>

       

        {inputUrl && (
          <div className="mt-6">
            <iframe
              className="w-full h-[600px] border-0 rounded-lg shadow-lg"
              src={`/play.html?url=${encodeURIComponent(inputUrl)}`}
              allowFullScreen
              scrolling="no"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Downloader;
