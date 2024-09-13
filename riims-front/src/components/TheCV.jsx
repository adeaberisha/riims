import React from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import fileDownload from 'js-file-download';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

const CVForm = () => {
  const location = useLocation();
  const { education } = location.state || {};  // Default to empty object if no state

  const downloadPdf = () => {
    const input = document.getElementById("cv-preview");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.width;
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;
      const height = pdfWidth / ratio;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, height);
      pdf.save("cv.pdf");
    });
  };

  const downloadJson = () => {
    const formData = {
      education: education.map(ed => ({
        institution: ed.institucioni,
        fieldOfStudy: ed.fushaStudimit,
        location: ed.lokacioni,
        startDate: new Date(ed.dataFillimit).toLocaleDateString(),
        endDate: ed.dataMbarimit ? new Date(ed.dataMbarimit).toLocaleDateString() : '',
        academicLevel: ed.niveliAkademik,
        description: ed.pershkrimi
      }))
    };
    fileDownload(JSON.stringify(formData), "cv-data.json");
  };

  return (
    <div className="container mt-4">
      {/* CV Preview Section */}
      <div id="cv-preview" className="p-4 border rounded bg-light">
        <div className="text-center mb-4">
          <h1 className="text-primary">CV Preview</h1>
        </div>
        <div className="mb-4">
          <h3 className="text-secondary">Education</h3>
          {education.map((ed, index) => (
            <div key={index} className="mb-3">
              <p><strong>Institution:</strong> {ed.institucioni}</p>
              <p><strong>Field of Study:</strong> {ed.fushaStudimit}</p>
              <p><strong>Location:</strong> {ed.lokacioni}</p>
              <p><strong>Start Date:</strong> {new Date(ed.dataFillimit).toLocaleDateString()}</p>
              {ed.dataMbarimit && (
                <p><strong>End Date:</strong> {new Date(ed.dataMbarimit).toLocaleDateString()}</p>
              )}
              <p><strong>Academic Level:</strong> {ed.niveliAkademik}</p>
              {ed.pershkrimi && (
                <p><strong>Description:</strong> {ed.pershkrimi}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-4">
        <button onClick={downloadPdf} className="btn btn-primary me-2">Download as PDF</button>
        <button onClick={downloadJson} className="btn btn-secondary">Download as JSON</button>
      </div>
    </div>
  );
};

export default CVForm;