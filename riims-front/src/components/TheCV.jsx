import React from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import fileDownload from 'js-file-download';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useProfile } from './ProfileContext';

const CVForm = () => {
  const location = useLocation();
  const { education } = location.state || {};
  const { experience } = location.state || {};
  const { user } = location.state || {};
  const { languages } = location.state || {};
  const { profileImage, setProfileImage } = useProfile();

  const downloadPdf = () => {
    const input = document.getElementById("cv-preview");
  
    // Use html2canvas to capture the element
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
  
      // Get canvas dimensions in pixels
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
  
      // Convert pixel dimensions to millimeters (jsPDF uses mm)
      const pdfWidth = imgWidth * 0.264583; // 1 px = 0.264583 mm
      const pdfHeight = imgHeight * 0.264583;
  
      // Create a PDF with the same dimensions as the canvas
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [pdfWidth, pdfHeight] // Custom size based on canvas
      });
  
      // Add the image to the PDF with exact dimensions
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  
      // Save the PDF
      pdf.save("cv.pdf");
    });
  };
  

  

  const downloadJson = () => {
    const formData = {
      education: education.map(ed => ({
        institution: ed.institucioni || 'N/A',
        fieldOfStudy: ed.fushaStudimit || 'N/A',
        location: ed.lokacioni || 'N/A',
        startDate: ed.dataFillimit ? new Date(ed.dataFillimit).toLocaleDateString() : 'N/A',
        endDate: ed.dataMbarimit ? new Date(ed.dataMbarimit).toLocaleDateString() : 'N/A',
        academicLevel: ed.niveliAkademik || 'N/A',
        description: ed.pershkrimi || 'N/A'
      })),
      experience: experience.map(exp => ({
        title: exp.titulli || 'N/A',
        typeOfEmployment: exp.llojiPunesimit || 'N/A',
        companyName: exp.emriInstitucionit || 'N/A',
        location: exp.lokacioni || 'N/A',
        locationType: exp.llojiLokacionit || 'N/A',
        startDate: exp.dataFillimit ? new Date(exp.dataFillimit).toLocaleDateString() : 'N/A',
        endDate: exp.dataMbarimit ? new Date(exp.dataMbarimit).toLocaleDateString() : 'N/A',
        description: exp.pershkrimi || 'N/A'
      })),
      user: {
        firstName: user.emri || 'N/A',
        lastName: user.mbiemri || 'N/A',
        gender: user.gjinia || 'N/A',
        address: user.adresa || 'N/A',
        birthDate: user.dataELindjes ? new Date(user.dataELindjes).toLocaleDateString() : 'N/A',
        academicTitle: user.titulliAkademik || 'N/A',
        phoneNumber: user.numriTelefonit || 'N/A'
      },
      languages: languages.map(lang => ({
        name: lang.emriGjuhes || 'N/A',
        level: lang.niveliGjuhesor || 'N/A'
      }))
    };

    fileDownload(JSON.stringify(formData), "cv-data.json");
  };


  return (
    <div className="container mt-4">
      {/* CV Preview Section */}
      <div id="cv-preview" className="cv-container p-4 border rounded bg-light">
        <div className="row">
          {/* Left Column */}
          <div className="col-md-4 left-section text-light p-4 bg-dark">
            <div className="text-center mb-4">
              <img
                src={profileImage || 'default-profile-image-url'} // Fallback image if profileImage is not set
                alt="Profile"
                className="img-fluid rounded-circle"
                style={{
                  width: '200px',
                  height: '200px',
                  objectFit: 'cover',
                  marginRight: '10px',
                  border: '3px solid #fff'
                }}
              />
              <h3 className="mb-1">{`${user.emri || 'N/A'} ${user.mbiemri || 'N/A'}`}</h3>
              <p className="text-primary">{user.titulliAkademik || 'N/A'}</p>
            </div>
            <div className="mb-4">
              <h5>Contact</h5>
              <p><i className="bi bi-phone"></i> {user.numriTelefonit || 'N/A'}</p>
              <p><i className="bi bi-geo-alt"></i> {user.adresa || 'N/A'}</p>
            </div>
            <div className="mb-4">
              <h5>Languages</h5>
              <ul className="list-unstyled">
                {languages.map((lang, index) => (
                  <li key={index}>
                    {lang.emriGjuhes || 'N/A'} {lang.niveliGjuhesor ? `(${lang.niveliGjuhesor})` : ''}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h5>Expertise</h5>
              <ul className="list-unstyled">
                <li>Management Skills</li>
                <li>Creativity</li>
                <li>Digital Marketing</li>
                <li>Negotiation</li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-md-8 p-4">
            <div className="mb-4">
              <h4 className="text-secondary">Experience</h4>
              {experience.map((exp, index) => (
                <div key={index} className="mb-3">
                  <h6>{exp.titulli || 'N/A'}</h6>
                  <p className="text-muted">{exp.llojiPunesimit || 'N/A'}</p>
                  <p>
                    <strong>Company and Location Type:</strong> 
                    {`${exp.emriInstitucionit || 'N/A'} - ${exp.llojiLokacionit || 'N/A'}`}
                  </p>
                  <p><strong>Location:</strong> {exp.lokacioni || 'N/A'}</p>
                  <p><strong>Start Date:</strong> {exp.dataFillimit ? new Date(exp.dataFillimit).toLocaleDateString() : 'N/A'}</p>
                  {exp.dataMbarimit && (
                    <p><strong>End Date:</strong> {new Date(exp.dataMbarimit).toLocaleDateString()}</p>
                  )}
                  {exp.pershkrimi && (
                    <p><strong>Description:</strong> {exp.pershkrimi || 'N/A'}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mb-4">
              <h4 className="text-secondary">Education</h4>
              {education.map((ed, index) => (
                <div key={index} className="mb-3">
                  <h5><strong>{ed.institucioni ? `${ed.institucioni} - ${ed.lokacioni}` : 'N/A'}</strong></h5>
                  <h5><strong>{`${ed.niveliAkademik || 'N/A'} ${ed.fushaStudimit || 'N/A'}`}</strong></h5>
                  <p>
                    <strong>
                      {ed.dataFillimit ? new Date(ed.dataFillimit).toLocaleDateString() : 'N/A'}
                      {ed.dataMbarimit ? ` - ${new Date(ed.dataMbarimit).toLocaleDateString()}` : ''}
                    </strong>
                  </p>
                </div>
              ))}
            </div>
          </div>
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
