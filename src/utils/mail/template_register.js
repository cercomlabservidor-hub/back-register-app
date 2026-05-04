export const getRegistrationTemplate = (data) => {
  const {
    fullName,
    documentType,
    otherDocumentType,
    documentNumber,
    birthDate,
    birthPlace,
    expeditionDate,
    expeditionPlace,
    address,
    residencePlace,
    department,
    city,
    gender,
    rh,
    phone,
    cellphone,
    email,
    educationLevel,
    degreeTitle,
    institutionName,
    employmentStatus,
    companyName,
    profession,
    experienceValue,
    experienceUnit,
    hasSpecialNeeds,
    specialNeedsDescription,
    requestType,
    selectedScheme,
    otherSchemeName,
    certificationStudyType,
    modality,
    submittedAt,
    signatureDataUrl
  } = data;

  const docLabel = documentType === "OTRO" ? otherDocumentType : documentType;
  const schemeLabel = selectedScheme === "OTRO ESQUEMA" ? otherSchemeName : selectedScheme;
  const formattedDate = submittedAt ? new Date(submittedAt).toLocaleString('es-CO') : new Date().toLocaleString('es-CO');

  // Colors from the web app
  const primaryColor = "#428bca";
  const darkColor = "#1a1a1a";
  const bgColor = "#f4f7f9";
  const surfaceColor = "#ffffff";
  const textColor = "#222222";
  const mutedTextColor = "#666666";

  return `
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nueva Solicitud de Registro - CERCOMLAB</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: ${bgColor};
        font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
      table {
        border-spacing: 0;
        width: 100%;
      }
      td {
        padding: 0;
      }
      .wrapper {
        width: 100%;
        table-layout: fixed;
        background-color: ${bgColor};
        padding: 40px 0;
      }
      .main-table {
        background-color: ${surfaceColor};
        margin: 0 auto;
        width: 600px;
        max-width: 600px;
        border-spacing: 0;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        border-radius: 16px;
        overflow: hidden;
        color: ${textColor};
      }
      .header {
        background: linear-gradient(135deg, ${darkColor} 0%, #333333 100%);
        padding: 40px;
        text-align: center;
        border-bottom: 4px solid ${primaryColor};
      }
      .header h1 {
        font-size: 26px;
        margin: 0;
        letter-spacing: 1px;
        color: #ffffff;
        font-weight: 600;
      }
      .accent-text {
        color: ${primaryColor};
      }
      .content {
        padding: 40px;
      }
      .notification-badge {
        background-color: rgba(66, 139, 202, 0.1);
        color: ${primaryColor};
        padding: 8px 18px;
        display: inline-block;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        margin-bottom: 25px;
      }
      .section-title {
        font-size: 15px;
        font-weight: 700;
        margin: 35px 0 15px 0;
        color: ${darkColor};
        text-transform: uppercase;
        letter-spacing: 1px;
        border-bottom: 2px solid #edf2f7;
        padding-bottom: 10px;
      }
      .info-box {
        background-color: #f8fafc;
        padding: 14px 18px;
        margin-bottom: 12px;
        border-radius: 10px;
        border-left: 4px solid ${primaryColor};
      }
      .info-label {
        font-size: 11px;
        color: ${mutedTextColor};
        text-transform: uppercase;
        margin-bottom: 4px;
        font-weight: 600;
        letter-spacing: 0.5px;
      }
      .info-value {
        font-size: 14px;
        color: ${textColor};
        line-height: 1.5;
        font-weight: 500;
      }
      .signature-container {
        text-align: center;
        background-color: #f8fafc;
        padding: 25px;
        border-radius: 12px;
        border: 2px dashed #e2e8f0;
        margin-top: 15px;
      }
      .signature-image {
        max-width: 280px;
        height: auto;
        display: block;
        margin: 0 auto;
        filter: contrast(1.1);
      }
      .footer {
        background-color: #f8fafc;
        padding: 35px;
        text-align: center;
        font-size: 12px;
        color: ${mutedTextColor};
        border-top: 1px solid #edf2f7;
      }
      .footer p {
        margin: 5px 0;
      }
      @media screen and (max-width: 600px) {
        .main-table {
          width: 100% !important;
          border-radius: 0 !important;
        }
        .content {
          padding: 30px 20px !important;
        }
        .header {
          padding: 30px 20px !important;
        }
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <center>
        <table class="main-table">
          <tr>
            <td class="header">
              <h1>CERCOM<span class="accent-text">LAB</span></h1>
            </td>
          </tr>
          <tr>
            <td class="content">
              <center>
                <div class="notification-badge">Registro de Solicitud</div>
              </center>
              
              <p style="font-size: 15px; color: ${textColor}; line-height: 1.6; text-align: center; margin-bottom: 30px;">
                Se ha recibido una nueva solicitud de evaluación y certificación de competencias laborales el día <strong>${formattedDate}</strong>.
              </p>

              <div class="section-title">1. Datos Personales</div>
              <div class="info-box">
                <div class="info-label">Nombre Completo</div>
                <div class="info-value"><strong>${fullName || 'N/A'}</strong></div>
              </div>
              
              <table width="100%">
                <tr>
                  <td width="55%" style="padding-right: 6px;">
                    <div class="info-box">
                      <div class="info-label">Identificación</div>
                      <div class="info-value">${docLabel || 'N/A'} - ${documentNumber || 'N/A'}</div>
                    </div>
                  </td>
                  <td width="45%" style="padding-left: 6px;">
                    <div class="info-box">
                      <div class="info-label">Celular</div>
                      <div class="info-value">${cellphone || 'N/A'}</div>
                    </div>
                  </td>
                </tr>
              </table>

              <table width="100%">
                <tr>
                  <td width="50%" style="padding-right: 6px;">
                    <div class="info-box">
                      <div class="info-label">Nacimiento</div>
                      <div class="info-value">${birthDate || 'N/A'} (${birthPlace || 'N/A'})</div>
                    </div>
                  </td>
                  <td width="50%" style="padding-left: 6px;">
                    <div class="info-box">
                      <div class="info-label">Expedición</div>
                      <div class="info-value">${expeditionDate || 'N/A'} (${expeditionPlace || 'N/A'})</div>
                    </div>
                  </td>
                </tr>
              </table>

              <div class="info-box">
                <div class="info-label">Ubicación</div>
                <div class="info-value">${address || 'N/A'}, ${residencePlace || 'N/A'} - ${city || 'N/A'}, ${department || 'N/A'}</div>
              </div>

              <table width="100%">
                <tr>
                  <td width="50%" style="padding-right: 6px;">
                    <div class="info-box">
                      <div class="info-label">Género / RH</div>
                      <div class="info-value">${gender || 'N/A'} - ${rh || 'N/A'}</div>
                    </div>
                  </td>
                  <td width="50%" style="padding-left: 6px;">
                    <div class="info-box">
                      <div class="info-label">Correo</div>
                      <div class="info-value">${email || 'N/A'}</div>
                    </div>
                  </td>
                </tr>
              </table>

              <div class="section-title">2. Perfil Académico y Laboral</div>
              <div class="info-box">
                <div class="info-label">Nivel de Educación</div>
                <div class="info-value">${educationLevel || 'N/A'} - ${degreeTitle || 'N/A'}</div>
              </div>
              <div class="info-box">
                <div class="info-label">Institución</div>
                <div class="info-value">${institutionName || 'N/A'}</div>
              </div>
              <div class="info-box">
                <div class="info-label">Situación Laboral</div>
                <div class="info-value">${employmentStatus || 'N/A'} ${companyName ? 'en ' + companyName : ''}</div>
              </div>
              
              <table width="100%">
                <tr>
                  <td width="60%" style="padding-right: 6px;">
                    <div class="info-box">
                      <div class="info-label">Profesión / Oficio</div>
                      <div class="info-value">${profession || 'N/A'}</div>
                    </div>
                  </td>
                  <td width="40%" style="padding-left: 6px;">
                    <div class="info-box">
                      <div class="info-label">Experiencia</div>
                      <div class="info-value">${experienceValue || '0'} ${experienceUnit || 'MESES'}</div>
                    </div>
                  </td>
                </tr>
              </table>

              ${hasSpecialNeeds === 'SI' ? `
              <div class="info-box" style="border-left-color: #ef4444; background-color: #fef2f2;">
                <div class="info-label" style="color: #ef4444;">Necesidades Especiales</div>
                <div class="info-value">${specialNeedsDescription || 'No especificada'}</div>
              </div>
              ` : ''}

              <div class="section-title">3. Detalles de la Solicitud</div>
              <div class="info-box">
                <div class="info-label">Tipo de Trámite</div>
                <div class="info-value"><strong>${requestType || 'N/A'}</strong></div>
              </div>
              <div class="info-box">
                <div class="info-label">Esquema de Certificación</div>
                <div class="info-value">${schemeLabel || 'N/A'}</div>
              </div>
              <table width="100%">
                <tr>
                  <td width="50%" style="padding-right: 6px;">
                    <div class="info-box">
                      <div class="info-label">Modalidad</div>
                      <div class="info-value">${modality || 'N/A'}</div>
                    </div>
                  </td>
                  <td width="50%" style="padding-left: 6px;">
                    ${certificationStudyType ? `
                    <div class="info-box">
                      <div class="info-label">Estudio</div>
                      <div class="info-value">${certificationStudyType}</div>
                    </div>
                    ` : ''}
                  </td>
                </tr>
              </table>

              <div class="section-title">4. Firma del Solicitante</div>
              <div class="signature-container">
                ${signatureDataUrl ? `
                  <img src="${signatureDataUrl}" alt="Firma digital" class="signature-image" />
                ` : '<p style="color: #94a3b8; font-style: italic;">No se capturó firma digital</p>'}
                <div style="margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
                  <span style="font-size: 14px; font-weight: 700; display: block; color: ${darkColor};">${fullName}</span>
                  <span style="font-size: 12px; color: ${mutedTextColor};">${docLabel}: ${documentNumber}</span>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td class="footer">
              <p><strong>CERCOMLAB S.A.S.</strong></p>
              <p>Organismo de Certificación de Personas</p>
              <p>Carrera 48 No. 76 D Sur - 52 Oficina 305, Sabaneta, Antioquia</p>
              <p style="margin-top: 15px; font-style: italic;">Este es un mensaje automático, por favor no responda a este correo.</p>
            </td>
          </tr>
        </table>
      </center>
    </div>
  </body>
</html>
  `;
};
