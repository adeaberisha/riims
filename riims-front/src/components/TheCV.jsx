import React from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import fileDownload from 'js-file-download';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useProfile } from './ProfileContext';
import '../css/TheCV.css';

const CVForm = () => {
  const location = useLocation();
  const {
    education = [],
    experience = [],
    user = {},
    email = 'N/A',
    languages = [],
    licenses = [],
    specialization = [],
    project = [],
    skills = [],
    works = [],
    publication = [],
    honors = []
  } = location.state || {};

  const { profileImage } = useProfile();

  const downloadPdf = () => {
    const input = document.getElementById("cv-preview");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? "landscape" : "portrait",
        unit: "mm",
        format: [canvas.width / 3.7795275591, canvas.height / 3.7795275591]
      });
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("cv.pdf");
    });
  };

  const downloadJson = () => {
    const formData = {
      education: education.length > 0 ? education.map(ed => ({
        institution: ed.institucioni || 'N/A',
        fieldOfStudy: ed.fushaStudimit || 'N/A',
        location: ed.lokacioni || 'N/A',
        startDate: ed.dataFillimit ? new Date(ed.dataFillimit).toLocaleDateString() : 'N/A',
        endDate: ed.dataMbarimit ? new Date(ed.dataMbarimit).toLocaleDateString() : 'N/A',
        academicLevel: ed.niveliAkademik || 'N/A',
        description: ed.pershkrimi || 'N/A'
      })) : [],
      experience: experience.length > 0 ? experience.map(exp => ({
        title: exp.titulli || 'N/A',
        typeOfEmployment: exp.llojiPunesimit || 'N/A',
        companyName: exp.emriInstitucionit || 'N/A',
        location: exp.lokacioni || 'N/A',
        locationType: exp.llojiLokacionit || 'N/A',
        startDate: exp.dataFillimit ? new Date(exp.dataFillimit).toLocaleDateString() : 'N/A',
        endDate: exp.dataMbarimit ? new Date(exp.dataMbarimit).toLocaleDateString() : 'N/A',
        description: exp.pershkrimi || 'N/A'
      })) : [],
      user: {
        firstName: user.emri || 'N/A',
        lastName: user.mbiemri || 'N/A',
        gender: user.gjinia || 'N/A',
        address: user.adresa || 'N/A',
        birthDate: user.dataELindjes ? new Date(user.dataELindjes).toLocaleDateString() : 'N/A',
        academicTitle: user.niveliAkademik || 'N/A',
        phoneNumber: user.numriTelefonit || 'N/A'
      },
      languages: languages.length > 0 ? languages.map(lang => ({
        name: lang.emriGjuhes || 'N/A',
        level: lang.niveliGjuhesor || 'N/A'
      })) : [],
      licenses: licenses.length > 0 ? licenses.map(lic => ({
        name: lic.emri || 'N/A',
        datel: lic.dataLeshimit || 'N/A',
        dates: lic.dataSkadimit || 'N/A',
        credentialId: lic.credentialId || 'N/A',
        credentialUrl: lic.credentialUrl || 'N/A',
        nameI: lic.emriInstitucionit || 'N/A'
      })) : [],
      specialization: specialization.length > 0 ? specialization.map(spec => ({
        type: spec.llojiIspecializimit || 'N/A',
        location: spec.lokacionit || 'N/A',
        dateF: spec.dataEFillimit || 'N/A',
        dateM: spec.dataEMbarimit || 'N/A',
        skills: spec.aftesiteEfituara || 'N/A',
        desc: spec.pershkrimi || 'N/A',
        nr: spec.nrKredive || 'N/A',
        name: spec.emriInstitucionit || 'N/A'
      })) : [],
      project: project.length > 0 ? project.map(prj => ({
        name: prj.emriProjektit || 'N/A',
        dateF: prj.startDate || 'N/A',
        dateM: prj.endDate || 'N/A',
        cllb: prj.collaborators || 'N/A',
        desc: prj.description || 'N/A',
        asoc: prj.asocohet || 'N/A',
        nameI: prj.emriInstitucionit || 'N/A'
      })) : [],
      skills: skills.length > 0 ? skills.map(sk => ({
        name: sk.emri || 'N/A',
        nameI: sk.emriInstitucionit || 'N/A'
      })) : [],
      works: works.length > 0 ? works.map(wr => ({
        role: wr.roli || 'N/A',
        dateF: wr.dataFillimit || 'N/A',
        dateM: wr.dataMbarimit || 'N/A',
        desc: wr.pershkrimi || 'N/A',
        inst: wr.emriInstitucionit || 'N/A'
      })) : [],
      publication: publication.length > 0 ? publication.map(pb => ({
        title: pb.titulli || 'N/A',
        type: pb.llojiPublikimit || 'N/A',
        link: pb.linkuPublikimit || 'N/A',
        author: pb.autoriKryesor || 'N/A',
        date: pb.dataPublikimi || 'N/A',
        nameD: pb.emriDepartamentit || 'N/A'
      })) : [],
      honors: honors.length > 0 ? honors.map(hr => ({
        title: hr.titulli || 'N/A',
        issuer: hr.issuer || 'N/A',
        date: hr.dataELeshimit || 'N/A',
        desc: hr.pershkrimi || 'N/A',
        inst: hr.emriInstitucionit || 'N/A'
      })) : []
    };

    fileDownload(JSON.stringify(formData), "cv-data.json");
  };

  return (
    <div className="container mt-4">
      {/* Download Buttons */}
      <div className="text-center mb-4">
        <button onClick={downloadPdf} className="btn btn-primary me-2">Download as PDF</button>
        <button onClick={downloadJson} className="btn btn-secondary">Download as JSON</button>
      </div>

      {/* CV Preview Section */}
      <div id="cv-preview" className="cv-container p-4 border rounded bg-light">
        <div className="row">
          {/* Left Column */}
          <div className="col-md-4 left-section text-light p-3 bg-dark">
            <div className="text-center mb-3">
              <div
                className="profile-picture-wrapper"
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  border: '3px solid #2565b3',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                  margin: '0 auto'
                }}
              >
                <img
                  src={profileImage || 'default-profile-image-url'}
                  alt="Profile"
                  className="img-fluid"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <h3 className="mt-2 mb-1">{`${user.emri || 'N/A'} ${user.mbiemri || 'N/A'}`}</h3>
              <p className="text-primary">{user.niveliAkademik || 'N/A'}</p>
            </div>
            <div className="mb-4 text-center">
              <p><i className="bi bi-phone"></i> {user.numriTelefonit || 'N/A'}</p>
              <p><i className="bi bi-geo-alt"></i> {user.adresa || 'N/A'}</p>
              <p><i className="bi bi-envelope"></i> {email || 'N/A'}</p>
            </div>
            {languages.length > 0 && (
              <div className="mb-3 text-center">
                <div
                  className="sidebar-circle-bg mb-3 mx-auto"
                  style={{
                    maxWidth: '200px',
                    border: '2px solid #00bfff'
                  }}
                >
                  <h4 className="text-white">Languages</h4>
                </div>
                <div className="d-flex justify-content-center">
                  <ul className="list-unstyled d-flex flex-column align-items-center">
                    {languages.map((lang, index) => (
                      <li key={index} className="my-2">
                        {lang.emriGjuhes || 'N/A'} {lang.niveliGjuhesor ? `(${lang.niveliGjuhesor})` : ''}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {skills.length > 0 && (
              <div className="mb-3 text-center">
                <div
                  className="sidebar-circle-bg mb-3 mx-auto"
                  style={{
                    maxWidth: '200px',
                    border: '2px solid #00bfff' // Light blue border
                  }}
                >
                  <h4 className="text-white">Skills</h4>
                </div>
                <div className="d-flex justify-content-center">
                  <ul className="list-unstyled d-flex flex-column align-items-center">
                    {skills.map((sk, index) => (
                      <li key={index} className="my-2">
                        {sk.emri || 'N/A'} {sk.emriInstitucionit ? `(${sk.emriInstitucionit})` : ''}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {works.length > 0 && (
              <div className="mb-3 text-center">
                <div
                  className="sidebar-circle-bg mb-3 mx-auto"
                  style={{
                    maxWidth: '200px',
                    border: '2px solid #00bfff'
                  }}
                >
                  <h4 className="text-white">Voluntary Works</h4>
                </div>
                <div className="d-flex justify-content-center">
                  <ul className="list-unstyled d-flex flex-column align-items-center">
                    {works.map((item, index) => (
                      <li key={index} className="my-2 text-center">
                        <strong> {item.roli || 'N/A'} <br /></strong>
                        <strong> {item.emriInstitucionit || 'N/A'} <br /></strong>
                        {item.dataFillimit && item.dataMbarimit
                          ? `${new Date(item.dataFillimit).toLocaleDateString()} - ${new Date(item.dataMbarimit).toLocaleDateString()}`
                          : item.dataFillimit
                            ? `${new Date(item.dataFillimit).toLocaleDateString()} - Present`
                            : 'N/A'
                        } <br />
                        {item.pershkrimi || 'N/A'}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}


          </div>

          {/* Right Column */}
          <div className="col-md-8">
            <div className="row gx-1">
              <div className="col-md-6 pe-1">
                {/* Experience Section */}
                {experience.length > 0 && (
                  <div className="mb-3">
                    <div className="circle-bg mb-2">
                      <h4 className="text-white">Experience</h4>
                    </div>
                    {experience.map((exp, index) => (
                      <div key={index} className="mb-3">
                        <h6 className="mb-1">
                          <strong>{exp.titulli || 'N/A'}</strong>
                        </h6>
                        <p className="mb-1">
                          <strong>
                            {`${exp.emriInstitucionit || 'N/A'} • ${exp.llojiPunesimit || 'N/A'}`}
                          </strong>
                        </p>
                        <p className="mb-1 text-muted small-text">
                          <strong>
                            {exp.dataFillimit ? new Date(exp.dataFillimit).toLocaleDateString() : 'N/A'}
                            {exp.dataMbarimit ? ` - ${new Date(exp.dataMbarimit).toLocaleDateString()}` : ' - Present'}
                          </strong>
                        </p>
                        <p className="mb-0 text-muted small-text">
                          <strong>
                            {exp.lokacioni ? `${exp.lokacioni} • ` : 'N/A •'}
                            {exp.llojiLokacionit || 'N/A'}
                          </strong>
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Education Section */}
                {education.length > 0 && (
                  <div className="mb-4">
                    <div className="circle-bg mb-2">
                      <h4 className="text-white">Education</h4>
                    </div>
                    {education.map((ed, index) => (
                      <div key={index} className="mb-3">
                        <h6 className="mb-1">
                          <strong>{ed.institucioni || 'N/A'}</strong>
                        </h6>
                        <h6 className="mb-1">
                          <strong>{`${ed.niveliAkademik || 'N/A'} ${ed.fushaStudimit || 'N/A'}`}</strong>
                        </h6>
                        <p className="mb-1 text-muted small-text">
                          <strong>
                            {ed.dataFillimit ? new Date(ed.dataFillimit).toLocaleDateString() : 'N/A'}
                            {ed.dataMbarimit ? ` - ${new Date(ed.dataMbarimit).toLocaleDateString()}` : ' - Present'}
                          </strong>
                        </p>
                        <p className="text-muted small-text">
                          <strong>{ed.lokacioni || 'N/A'}</strong>
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Specializations Section */}
                {specialization.length > 0 && (
                  <div className="mb-4">
                    <div className="circle-bg mb-2">
                      <h4 className="text-white">Specializations</h4>
                    </div>
                    {specialization.map((spec, index) => (
                      <div key={index} className="mb-3">
                        <h6 className="mb-1">
                          <strong>
                            {spec.llojiIspecializimit ? `${spec.llojiIspecializimit} (${spec.nrKredive || 'N/A'} ECTS)` : 'N/A'}
                          </strong>
                        </h6>
                        <p className="mb-1">
                          <strong>{spec.emriInstitucionit || 'N/A'}</strong>
                        </p>
                        <p className="mb-1 text-muted small-text">
                          <strong>
                            {spec.dataEFillimit ? new Date(spec.dataEFillimit).toLocaleDateString() : 'N/A'}
                            {spec.dataEMbarimit ? ` - ${new Date(spec.dataEMbarimit).toLocaleDateString()}` : ' - Present'}
                          </strong>
                        </p>
                        <p className="mb-1 text-muted small-text">
                          <strong>{spec.lokacionit || 'N/A'}</strong>
                        </p>
                        <p className="mb-1 text-muted small-text">
                          <strong>{spec.aftesiteEfituara || 'N/A'}</strong>
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {/* Publications Section */}
                {publication.length > 0 && (
                  <div className="mb-4">
                    <div
                      className="circle-bg mb-2"
                    >
                      <h4 className="text-white">Publications</h4>
                    </div>
                    {publication.map((pb, index) => (
                      <div key={index} className="mb-3">
                        <h6 className="mb-1">
                          <strong>{pb.titulli || 'N/A'}</strong>
                        </h6>
                        <p className="mb-1">
                          <strong>
                            {pb.llojiPublikimit || 'N/A'}
                            {pb.autoriKryesor ? ` • Main author` : ''}
                          </strong>
                        </p>
                        <p className="mb-1 text-muted small-text">
                          <strong>
                            {pb.dataPublikimi ? new Date(pb.dataPublikimi).toLocaleDateString() : 'N/A'}
                          </strong>
                        </p>
                        <p className="mb-1 text-muted small-text">
                          <strong>
                            {pb.emriDepartamentit || 'N/A'}
                          </strong>
                        </p>
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Licenses and Projects Sections */}
              <div className="col-md-6 ps-1">
                {/* Licenses Section */}
                {licenses.length > 0 && (
                  <div className="mb-3">
                    <div className="circle-bg mb-2">
                      <h4 className="text-white">Licenses</h4>
                    </div>
                    {licenses.map((li, index) => (
                      <div key={index} className="mb-3">
                        {li.emri && (
                          <h6 className="mb-1"><strong>{li.emri}</strong></h6>
                        )}
                        {li.emriInstitucionit && (
                          <p className="mb-1">
                            <strong>{li.emriInstitucionit}</strong>
                          </p>
                        )}
                        {(li.dataLeshimit || li.dataSkadimit) && (
                          <p className="mb-1 text-muted small-text">
                            <strong>
                              {li.dataLeshimit ? new Date(li.dataLeshimit).toLocaleDateString() : 'N/A'}
                              {li.dataSkadimit ? ` - ${new Date(li.dataSkadimit).toLocaleDateString()}` : ''}
                            </strong>
                          </p>
                        )}
                        {li.credentialId && (
                          <p className="mb-1 text-muted small-text">
                            <strong> {li.credentialId}</strong>
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {/* Honors and Awards Section */}
                {honors.length > 0 && (
                  <div className="mb-3">
                    <div className="circle-bg mb-2">
                      <h4 className="text-white">Nderime dhe Çmime</h4> {/* Albanian for "Honors and Awards" */}
                    </div>
                    {honors.map((hr, index) => (
                      <div key={index} className="mb-3">
                        {hr.titulli && (
                          <h6 className="mb-1">
                            <strong>{hr.titulli}</strong>
                          </h6>
                        )}
                        {hr.issuer && (
                          <p className="mb-1">
                            <strong>
                              {hr.issuer}
                              {hr.emriInstitucionit ? ` (${hr.emriInstitucionit})` : ''}
                            </strong>
                          </p>
                        )}
                        {hr.dataEleshimit && (
                          <p className="mb-1 text-muted small-text">
                            <strong>
                              {new Date(hr.dataEleshimit).toLocaleDateString()}
                            </strong>
                          </p>
                        )}
                        {hr.pershkrimi && (
                          <p className="mb-1 text-muted small-text">
                            <strong>{hr.pershkrimi}</strong>
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {/* Projects Section */}
                {project.length > 0 && (
                  <div className="mb-3">
                    <div className="circle-bg mb-2">
                      <h4 className="text-white">Projects</h4>
                    </div>
                    {project.map((prj, index) => (
                      <div key={index} className="mb-3">
                        {prj.emriProjektit && (
                          <h6 className="mb-1"><strong>{prj.emriProjektit}</strong></h6>
                        )}
                        {prj.emriInstitucionit && (
                          <p className="mb-1">
                            <strong>Associated with {prj.emriInstitucionit}</strong>
                          </p>
                        )}
                        {(prj.startDate || prj.endDate) && (
                          <p className="mb-1 text-muted small-text">
                            <strong>
                              {prj.startDate ? new Date(prj.startDate).toLocaleDateString() : 'N/A'}
                              {prj.endDate ? ` - ${new Date(prj.endDate).toLocaleDateString()}` : ' - Ongoing'}
                            </strong>
                          </p>
                        )}
                        {prj.description && (
                          <p className="mb-1 text-muted small-text">
                            <strong>{prj.description}</strong>
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVForm;
