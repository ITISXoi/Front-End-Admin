const mimeType = (url: string) => {
  const xhttp = new XMLHttpRequest();
  xhttp.open('HEAD', url);
  xhttp.onreadystatechange = function () {
    if (this.readyState === this.DONE) {
      console.log(this.status);
      console.log(this.getResponseHeader('Content-Type'));
    }
  };
  xhttp.send();
};
export default mimeType;
