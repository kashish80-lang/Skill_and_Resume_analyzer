import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.js";

function UploadResume({ setResumeText }) {
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = () => setResumeText(reader.result);
      reader.readAsText(file);
    }

    if (file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = async () => {
        const pdf = await getDocument(new Uint8Array(reader.result)).promise;
        let text = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map((x) => x.str).join(" ") + " ";
        }

        setResumeText(text);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="box">
      <h3>Upload Resume</h3>
      <input type="file" accept=".txt,.pdf" onChange={handleFile} />
    </div>
  );
}

export default UploadResume;
