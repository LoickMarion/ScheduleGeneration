import './App.css';
import React,  { useState, useEffect } from 'react'

function FetchData({children}){
  const [backendData, setBackendData] = useState();

  useEffect(() => {
    fetch("http://localhost:5001/").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data);
      }
    ).catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);
  return <>{children(backendData)}</>
}

function ResetButton() {
  const handleReset = async () => {
    try {
      const response = await fetch('http://localhost:5001/reset-majors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error('Failed to reset majors');
      }
      window.location.reload()
    } catch (error) {
      console.error('Error resetting majors:', error);
    }
  };

  return (
    <button onClick={handleReset}>Reset Majors</button>
  );
}

const handleAddGenEds = async () => {
  try {
    const response = await fetch('http://localhost:5001/selected-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        hasGenEds: true // Set hasGenEds to true
      })
    });
    console.log('Response:', response);
    // Handle response if necessary
  } catch (error) {
    console.error('Error:', error);
    // Handle error if necessary
  }
};

function PrimaryMajorMenu() {

  const [selectedPrimaryMajor, setSelectedPrimaryMajor] = useState('');

  const handleSelectChange = (event) => {
    setSelectedPrimaryMajor(event.target.value);
    sendSelectedPrimaryMajor(event.target.value)
  };

  const sendSelectedPrimaryMajor = async (primaryMajor) => {
    try {
      const response = await fetch('http://localhost:5001/selected-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ primaryMajor }),
      });

      if (!response.ok) {
        throw new Error('Failed to send selected major to the backend');
      }
    } catch (error) {
      console.error('Error sending selected major to the backend:', error);
    }
  };

  return (
    <div className='select-container'>
      <select value={selectedPrimaryMajor} onChange={handleSelectChange} className="select-style">
        <option value="Please select a major first!">Select your primary major!</option>
        <option value="ACCOUNTG">Accounting</option>
        <option value="AFROAM">Afro-American Studies</option>
        <option value="ANIMLSCI">Animal Science, Animal Biotechnology, and Biomedical Sciences</option>
        <option value="Anthropology">Anthropology</option>
        <option value="Arboriculture and Community Forest Management">Arboriculture and Community Forest Management</option>
        <option value="Architecture">Architecture</option>
        <option value="Art">Art</option>
        <option value="Art Education">Art Education</option>
        <option value="Art History">Art History</option>
        <option value="Astronomy">Astronomy</option>
        <option value="Bachelor’s Degree with Individual Concentration (BDIC)">Bachelor’s Degree with Individual Concentration (BDIC)</option>
        <option value="Biochemistry and Molecular Biology">Biochemistry and Molecular Biology</option>
        <option value="BIOLOGY">Biology</option>
        <option value="Biomedical Engineering">Biomedical Engineering</option>
        <option value="Building and Construction Technology">Building and Construction Technology</option>
        <option value="Chemical Engineering">Chemical Engineering</option>
        <option value="Chemistry">Chemistry</option>
        <option value="Chinese Language and Literature">Chinese Language and Literature</option>
        <option value="Civil Engineering">Civil Engineering</option>
        <option value="Classics">Classics</option>
        <option value="Communication">Communication</option>
        <option value="Communication Disorders">Communication Disorders</option>
        <option value="Comparative Literature">Comparative Literature</option>
        <option value="CS">Computer Science</option>
        <option value="Dance">Dance</option>
        <option value="Economics">Economics</option>
        <option value="Education">Education</option>
        <option value="Electrical and Computer Engineering">Electrical and Computer Engineering</option>
        <option value="English">English</option>
        <option value="Environmental Science">Environmental Science</option>
        <option value="Film Studies through BDIC">Film Studies through BDIC</option>
        <option value="Finance">Finance</option>
        <option value="Food Science">Food Science</option>
        <option value="French & Francophone Studies">French & Francophone Studies</option>
        <option value="Geography">Geography</option>
        <option value="Geology">Geology</option>
        <option value="Geosciences">Geosciences</option>
        <option value="German and Scandinavian Studies">German and Scandinavian Studies</option>
        <option value="HISTORY">History</option>
        <option value="History of Art and Architecture">History of Art and Architecture</option>
        <option value="Horticultural Science">Horticultural Science</option>
        <option value="Hospitality and Tourism Management">Hospitality and Tourism Management</option>
        <option value="Industrial Engineering">Industrial Engineering</option>
        <option value="Informatics">Informatics</option>
        <option value="Italian Studies">Italian Studies</option>
        <option value="Japanese Language & Literature">Japanese Language & Literature</option>
        <option value="Journalism">Journalism</option>
        <option value="Judaic Studies">Judaic Studies</option>
        <option value="Kinesiology">Kinesiology</option>
        <option value="Landscape Architecture">Landscape Architecture</option>
        <option value="Landscape Contracting">Landscape Contracting</option>
        <option value="Legal Studies">Legal Studies</option>
        <option value="Linguistics">Linguistics</option>
        <option value="Management">Management</option>
        <option value="Managerial Economics">Managerial Economics</option>
        <option value="Marketing">Marketing</option>
        <option value="MATH">Mathematics</option>
        <option value="Mechanical Engineering">Mechanical Engineering</option>
        <option value="Microbiology">Microbiology</option>
        <option value="Middle Eastern Studies">Middle Eastern Studies</option>
        <option value="Music">Music</option>
        <option value="Natural Resource Conservation">Natural Resource Conservation</option>
        <option value="Nursing">Nursing</option>
        <option value="Nutrition">Nutrition</option>
        <option value="Operations and Information Management">Operations and Information Management</option>
        <option value="Philosophy">Philosophy</option>
        <option value="PHYSICS">Physics</option>
        <option value="Plant and Soil Science">Plant and Soil Science</option>
        <option value="Political Science">Political Science</option>
        <option value="Portuguese">Portuguese</option>
        <option value="Pre-Medical, Pre-Health">Pre-Medical, Pre-Health</option>
        <option value="Pre-Veterinary">Pre-Veterinary</option>
        <option value="Psychology">Psychology</option>
        <option value="Public Health Sciences">Public Health Sciences</option>
        <option value="Public Policy">Public Policy</option>
        <option value="Resource Economics">Resource Economics</option>
        <option value="Russian and East European Studies">Russian and East European Studies</option>
        <option value="Social Thought and Political Economy">Social Thought and Political Economy</option>
        <option value="Sociology">Sociology</option>
        <option value="Spanish">Spanish</option>
        <option value="Sport Management">Sport Management</option>
        <option value="Sustainable Community Development">Sustainable Community Development</option>
        <option value="Sustainable Food and Farming">Sustainable Food and Farming</option>
        <option value="Sustainable Horticulture">Sustainable Horticulture</option>
        <option value="Theater">Theater</option>
        <option value="Turfgrass Management">Turfgrass Management</option>
        <option value="University Without Walls Interdisciplinary Studies">University Without Walls Interdisciplinary Studies</option>
        <option value="Veterinary Technology">Veterinary Technology</option>
        <option value="Women, Gender, Sexuality Studies">Women, Gender, Sexuality Studies</option>

      </select>
    </div>
  );
}

function SecondaryMajorMenu(){
  const [selectedSecondaryMajor, setSelectedSecondaryMajor] = useState('')

  const handleSelectChange = (event) => {
    setSelectedSecondaryMajor(event.target.value)
    sendSelectedSecondaryMajor(event.target.value)
  }

  const sendSelectedSecondaryMajor = async (secondaryMajor) => {
    try {
      const response = await fetch('http://localhost:5001/selected-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ secondaryMajor }),
      });

      if (!response.ok) {
        throw new Error('Failed to send selected major to the backend');
      }
    } catch (error) {
      console.error('Error sending selected major to the backend:', error);
    }
  };

  return (
    <div className='select-container'>
        <select value={selectedSecondaryMajor} onChange={handleSelectChange} className="select-style">
        <option value="Please select an option first!">If applicable, choose a second major</option>
        <option value="ACCOUNTG">Accounting</option>
        <option value="AFROAM">Afro-American Studies</option>
        <option value="ANIMLSCI">Animal Science, Animal Biotechnology, and Biomedical Sciences</option>
        <option value="Anthropology">Anthropology</option>
        <option value="Arboriculture and Community Forest Management">Arboriculture and Community Forest Management</option>
        <option value="Architecture">Architecture</option>
        <option value="Art">Art</option>
        <option value="Art Education">Art Education</option>
        <option value="Art History">Art History</option>
        <option value="Astronomy">Astronomy</option>
        <option value="Bachelor’s Degree with Individual Concentration (BDIC)">Bachelor’s Degree with Individual Concentration (BDIC)</option>
        <option value="Biochemistry and Molecular Biology">Biochemistry and Molecular Biology</option>
        <option value="BIOLOGY">Biology</option>
        <option value="Biomedical Engineering">Biomedical Engineering</option>
        <option value="Building and Construction Technology">Building and Construction Technology</option>
        <option value="Chemical Engineering">Chemical Engineering</option>
        <option value="Chemistry">Chemistry</option>
        <option value="Chinese Language and Literature">Chinese Language and Literature</option>
        <option value="Civil Engineering">Civil Engineering</option>
        <option value="Classics">Classics</option>
        <option value="Communication">Communication</option>
        <option value="Communication Disorders">Communication Disorders</option>
        <option value="Comparative Literature">Comparative Literature</option>
        <option value="CS">Computer Science</option>
        <option value="Dance">Dance</option>
        <option value="Economics">Economics</option>
        <option value="Education">Education</option>
        <option value="Electrical and Computer Engineering">Electrical and Computer Engineering</option>
        <option value="English">English</option>
        <option value="Environmental Science">Environmental Science</option>
        <option value="Film Studies through BDIC">Film Studies through BDIC</option>
        <option value="Finance">Finance</option>
        <option value="Food Science">Food Science</option>
        <option value="French & Francophone Studies">French & Francophone Studies</option>
        <option value="Geography">Geography</option>
        <option value="Geology">Geology</option>
        <option value="Geosciences">Geosciences</option>
        <option value="German and Scandinavian Studies">German and Scandinavian Studies</option>
        <option value="HISTORY">History</option>
        <option value="History of Art and Architecture">History of Art and Architecture</option>
        <option value="Horticultural Science">Horticultural Science</option>
        <option value="Hospitality and Tourism Management">Hospitality and Tourism Management</option>
        <option value="Industrial Engineering">Industrial Engineering</option>
        <option value="Informatics">Informatics</option>
        <option value="Italian Studies">Italian Studies</option>
        <option value="Japanese Language & Literature">Japanese Language & Literature</option>
        <option value="Journalism">Journalism</option>
        <option value="Judaic Studies">Judaic Studies</option>
        <option value="Kinesiology">Kinesiology</option>
        <option value="Landscape Architecture">Landscape Architecture</option>
        <option value="Landscape Contracting">Landscape Contracting</option>
        <option value="Legal Studies">Legal Studies</option>
        <option value="Linguistics">Linguistics</option>
        <option value="Management">Management</option>
        <option value="Managerial Economics">Managerial Economics</option>
        <option value="Marketing">Marketing</option>
        <option value="MATH">Mathematics</option>
        <option value="Mechanical Engineering">Mechanical Engineering</option>
        <option value="Microbiology">Microbiology</option>
        <option value="Middle Eastern Studies">Middle Eastern Studies</option>
        <option value="Music">Music</option>
        <option value="Natural Resource Conservation">Natural Resource Conservation</option>
        <option value="Nursing">Nursing</option>
        <option value="Nutrition">Nutrition</option>
        <option value="Operations and Information Management">Operations and Information Management</option>
        <option value="Philosophy">Philosophy</option>
        <option value="PHYSICS">Physics</option>
        <option value="Plant and Soil Science">Plant and Soil Science</option>
        <option value="Political Science">Political Science</option>
        <option value="Portuguese">Portuguese</option>
        <option value="Pre-Medical, Pre-Health">Pre-Medical, Pre-Health</option>
        <option value="Pre-Veterinary">Pre-Veterinary</option>
        <option value="Psychology">Psychology</option>
        <option value="Public Health Sciences">Public Health Sciences</option>
        <option value="Public Policy">Public Policy</option>
        <option value="Resource Economics">Resource Economics</option>
        <option value="Russian and East European Studies">Russian and East European Studies</option>
        <option value="Social Thought and Political Economy">Social Thought and Political Economy</option>
        <option value="Sociology">Sociology</option>
        <option value="Spanish">Spanish</option>
        <option value="Sport Management">Sport Management</option>
        <option value="Sustainable Community Development">Sustainable Community Development</option>
        <option value="Sustainable Food and Farming">Sustainable Food and Farming</option>
        <option value="Sustainable Horticulture">Sustainable Horticulture</option>
        <option value="Theater">Theater</option>
        <option value="Turfgrass Management">Turfgrass Management</option>
        <option value="University Without Walls Interdisciplinary Studies">University Without Walls Interdisciplinary Studies</option>
        <option value="Veterinary Technology">Veterinary Technology</option>
        <option value="Women, Gender, Sexuality Studies">Women, Gender, Sexuality Studies</option>

      </select>
    </div>
  );
}

function ThirdMajorMenu(){
  const [selectedThirdMajor, setSelectedThirdMajor] = useState('')

  const handleSelectChange = (event) => {
    setSelectedThirdMajor(event.target.value)
    sendSelectedThirdMajor(event.target.value)
  }

  const sendSelectedThirdMajor = async (thirdMajor) => {
    try {
      const response = await fetch('http://localhost:5001/selected-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ thirdMajor }),
      });

      if (!response.ok) {
        throw new Error('Failed to send selected major to the backend');
      }
    } catch (error) {
      console.error('Error sending selected major to the backend:', error);
    }
  };

  return (
    <div className='select-container'>
        <select value={selectedThirdMajor} onChange={handleSelectChange} className="select-style">
        <option value="Please select an option first!">If applicable, choose a third major</option>
        <option value="ACCOUNTG">Accounting</option>
        <option value="AFROAM">Afro-American Studies</option>
        <option value="ANIMLSCI">Animal Science, Animal Biotechnology, and Biomedical Sciences</option>
        <option value="Anthropology">Anthropology</option>
        <option value="Arboriculture and Community Forest Management">Arboriculture and Community Forest Management</option>
        <option value="Architecture">Architecture</option>
        <option value="Art">Art</option>
        <option value="Art Education">Art Education</option>
        <option value="Art History">Art History</option>
        <option value="Astronomy">Astronomy</option>
        <option value="Bachelor’s Degree with Individual Concentration (BDIC)">Bachelor’s Degree with Individual Concentration (BDIC)</option>
        <option value="Biochemistry and Molecular Biology">Biochemistry and Molecular Biology</option>
        <option value="BIOLOGY">Biology</option>
        <option value="Biomedical Engineering">Biomedical Engineering</option>
        <option value="Building and Construction Technology">Building and Construction Technology</option>
        <option value="Chemical Engineering">Chemical Engineering</option>
        <option value="Chemistry">Chemistry</option>
        <option value="Chinese Language and Literature">Chinese Language and Literature</option>
        <option value="Civil Engineering">Civil Engineering</option>
        <option value="Classics">Classics</option>
        <option value="Communication">Communication</option>
        <option value="Communication Disorders">Communication Disorders</option>
        <option value="Comparative Literature">Comparative Literature</option>
        <option value="CS">Computer Science</option>
        <option value="Dance">Dance</option>
        <option value="Economics">Economics</option>
        <option value="Education">Education</option>
        <option value="Electrical and Computer Engineering">Electrical and Computer Engineering</option>
        <option value="English">English</option>
        <option value="Environmental Science">Environmental Science</option>
        <option value="Film Studies through BDIC">Film Studies through BDIC</option>
        <option value="Finance">Finance</option>
        <option value="Food Science">Food Science</option>
        <option value="French & Francophone Studies">French & Francophone Studies</option>
        <option value="Geography">Geography</option>
        <option value="Geology">Geology</option>
        <option value="Geosciences">Geosciences</option>
        <option value="German and Scandinavian Studies">German and Scandinavian Studies</option>
        <option value="HISTORY">History</option>
        <option value="History of Art and Architecture">History of Art and Architecture</option>
        <option value="Horticultural Science">Horticultural Science</option>
        <option value="Hospitality and Tourism Management">Hospitality and Tourism Management</option>
        <option value="Industrial Engineering">Industrial Engineering</option>
        <option value="Informatics">Informatics</option>
        <option value="Italian Studies">Italian Studies</option>
        <option value="Japanese Language & Literature">Japanese Language & Literature</option>
        <option value="Journalism">Journalism</option>
        <option value="Judaic Studies">Judaic Studies</option>
        <option value="Kinesiology">Kinesiology</option>
        <option value="Landscape Architecture">Landscape Architecture</option>
        <option value="Landscape Contracting">Landscape Contracting</option>
        <option value="Legal Studies">Legal Studies</option>
        <option value="Linguistics">Linguistics</option>
        <option value="Management">Management</option>
        <option value="Managerial Economics">Managerial Economics</option>
        <option value="Marketing">Marketing</option>
        <option value="MATH">Mathematics</option>
        <option value="Mechanical Engineering">Mechanical Engineering</option>
        <option value="Microbiology">Microbiology</option>
        <option value="Middle Eastern Studies">Middle Eastern Studies</option>
        <option value="Music">Music</option>
        <option value="Natural Resource Conservation">Natural Resource Conservation</option>
        <option value="Nursing">Nursing</option>
        <option value="Nutrition">Nutrition</option>
        <option value="Operations and Information Management">Operations and Information Management</option>
        <option value="Philosophy">Philosophy</option>
        <option value="PHYSICS">Physics</option>
        <option value="Plant and Soil Science">Plant and Soil Science</option>
        <option value="Political Science">Political Science</option>
        <option value="Portuguese">Portuguese</option>
        <option value="Pre-Medical, Pre-Health">Pre-Medical, Pre-Health</option>
        <option value="Pre-Veterinary">Pre-Veterinary</option>
        <option value="Psychology">Psychology</option>
        <option value="Public Health Sciences">Public Health Sciences</option>
        <option value="Public Policy">Public Policy</option>
        <option value="Resource Economics">Resource Economics</option>
        <option value="Russian and East European Studies">Russian and East European Studies</option>
        <option value="Social Thought and Political Economy">Social Thought and Political Economy</option>
        <option value="Sociology">Sociology</option>
        <option value="Spanish">Spanish</option>
        <option value="Sport Management">Sport Management</option>
        <option value="Sustainable Community Development">Sustainable Community Development</option>
        <option value="Sustainable Food and Farming">Sustainable Food and Farming</option>
        <option value="Sustainable Horticulture">Sustainable Horticulture</option>
        <option value="Theater">Theater</option>
        <option value="Turfgrass Management">Turfgrass Management</option>
        <option value="University Without Walls Interdisciplinary Studies">University Without Walls Interdisciplinary Studies</option>
        <option value="Veterinary Technology">Veterinary Technology</option>
        <option value="Women, Gender, Sexuality Studies">Women, Gender, Sexuality Studies</option>

      </select>
    </div>
  );
}

function MinorMenu(){
  const [selectedMinor, setSelectedMinor] = useState('')

  const handleSelectChange = (event) => {
    setSelectedMinor(event.target.value)
    sendSelectedMinor(event.target.value)
  }

  const sendSelectedMinor = async (minor) => {
    try {
      const response = await fetch('http://localhost:5001/selected-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ minor }),
      });

      if (!response.ok) {
        throw new Error('Failed to send selected major to the backend');
      }
    } catch (error) {
      console.error('Error sending selected major to the backend:', error);
    }
  };

  return (
    <div className='select-container'>
        <select value={selectedMinor} onChange={handleSelectChange} className="select-style">
        <option value="Please select an option first!">If applicable, choose a minor</option>
        <option value="ACCOUNTG">Accounting</option>
        <option value="AFROAM">Afro-American Studies</option>
        <option value="ANIMLSCI">Animal Science, Animal Biotechnology, and Biomedical Sciences</option>
        <option value="Anthropology">Anthropology</option>
        <option value="Arboriculture and Community Forest Management">Arboriculture and Community Forest Management</option>
        <option value="Architecture">Architecture</option>
        <option value="Art">Art</option>
        <option value="Art Education">Art Education</option>
        <option value="Art History">Art History</option>
        <option value="Astronomy">Astronomy</option>
        <option value="Bachelor’s Degree with Individual Concentration (BDIC)">Bachelor’s Degree with Individual Concentration (BDIC)</option>
        <option value="Biochemistry and Molecular Biology">Biochemistry and Molecular Biology</option>
        <option value="BIOLOGY">Biology</option>
        <option value="Biomedical Engineering">Biomedical Engineering</option>
        <option value="Building and Construction Technology">Building and Construction Technology</option>
        <option value="Chemical Engineering">Chemical Engineering</option>
        <option value="Chemistry">Chemistry</option>
        <option value="Chinese Language and Literature">Chinese Language and Literature</option>
        <option value="Civil Engineering">Civil Engineering</option>
        <option value="Classics">Classics</option>
        <option value="Communication">Communication</option>
        <option value="Communication Disorders">Communication Disorders</option>
        <option value="Comparative Literature">Comparative Literature</option>
        <option value="CS">Computer Science</option>
        <option value="Dance">Dance</option>
        <option value="Economics">Economics</option>
        <option value="Education">Education</option>
        <option value="Electrical and Computer Engineering">Electrical and Computer Engineering</option>
        <option value="English">English</option>
        <option value="Environmental Science">Environmental Science</option>
        <option value="Film Studies through BDIC">Film Studies through BDIC</option>
        <option value="Finance">Finance</option>
        <option value="Food Science">Food Science</option>
        <option value="French & Francophone Studies">French & Francophone Studies</option>
        <option value="Geography">Geography</option>
        <option value="Geology">Geology</option>
        <option value="Geosciences">Geosciences</option>
        <option value="German and Scandinavian Studies">German and Scandinavian Studies</option>
        <option value="HISTORY">History</option>
        <option value="History of Art and Architecture">History of Art and Architecture</option>
        <option value="Horticultural Science">Horticultural Science</option>
        <option value="Hospitality and Tourism Management">Hospitality and Tourism Management</option>
        <option value="Industrial Engineering">Industrial Engineering</option>
        <option value="Informatics">Informatics</option>
        <option value="Italian Studies">Italian Studies</option>
        <option value="Japanese Language & Literature">Japanese Language & Literature</option>
        <option value="Journalism">Journalism</option>
        <option value="Judaic Studies">Judaic Studies</option>
        <option value="Kinesiology">Kinesiology</option>
        <option value="Landscape Architecture">Landscape Architecture</option>
        <option value="Landscape Contracting">Landscape Contracting</option>
        <option value="Legal Studies">Legal Studies</option>
        <option value="Linguistics">Linguistics</option>
        <option value="Management">Management</option>
        <option value="Managerial Economics">Managerial Economics</option>
        <option value="Marketing">Marketing</option>
        <option value="MATH">Mathematics</option>
        <option value="Mechanical Engineering">Mechanical Engineering</option>
        <option value="Microbiology">Microbiology</option>
        <option value="Middle Eastern Studies">Middle Eastern Studies</option>
        <option value="Music">Music</option>
        <option value="Natural Resource Conservation">Natural Resource Conservation</option>
        <option value="Nursing">Nursing</option>
        <option value="Nutrition">Nutrition</option>
        <option value="Operations and Information Management">Operations and Information Management</option>
        <option value="Philosophy">Philosophy</option>
        <option value="PHYSICS">Physics</option>
        <option value="Plant and Soil Science">Plant and Soil Science</option>
        <option value="Political Science">Political Science</option>
        <option value="Portuguese">Portuguese</option>
        <option value="Pre-Medical, Pre-Health">Pre-Medical, Pre-Health</option>
        <option value="Pre-Veterinary">Pre-Veterinary</option>
        <option value="Psychology">Psychology</option>
        <option value="Public Health Sciences">Public Health Sciences</option>
        <option value="Public Policy">Public Policy</option>
        <option value="Resource Economics">Resource Economics</option>
        <option value="Russian and East European Studies">Russian and East European Studies</option>
        <option value="Social Thought and Political Economy">Social Thought and Political Economy</option>
        <option value="Sociology">Sociology</option>
        <option value="Spanish">Spanish</option>
        <option value="Sport Management">Sport Management</option>
        <option value="Sustainable Community Development">Sustainable Community Development</option>
        <option value="Sustainable Food and Farming">Sustainable Food and Farming</option>
        <option value="Sustainable Horticulture">Sustainable Horticulture</option>
        <option value="Theater">Theater</option>
        <option value="Turfgrass Management">Turfgrass Management</option>
        <option value="University Without Walls Interdisciplinary Studies">University Without Walls Interdisciplinary Studies</option>
        <option value="Veterinary Technology">Veterinary Technology</option>
        <option value="Women, Gender, Sexuality Studies">Women, Gender, Sexuality Studies</option>

      </select>
    </div>
  );
}

function CreditSlider(){
  const [selectedCredits, setSelectedCredits] = useState(12)

  const handleSelectChange = (event) => {
    const credits = parseInt(event.target.value, 10);
    setSelectedCredits(credits)
    sendSelectedCredits(credits)
  }

  const sendSelectedCredits = async (credits) => {
    try {
      const response = await fetch('http://localhost:5001/selected-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credits }),
      });

      if (!response.ok) {
        throw new Error('Failed to send selected credits to the backend');
      }
    } catch (error) {
      console.error('Error sending selected credits to the backend:', error);
    }
  };

  return (
    <div>
    <input
      type="range"
      min="12"
      max="19"
      value={selectedCredits}
      onChange={handleSelectChange}
    />
    <span>{selectedCredits}</span>
  </div>

  )
}

function PrevTakenCourses() {
  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleSelectChange = async (event) => {
    if (event.key === 'Enter') {
      const takenCourse = event.target.value;
      setSelectedCourses(prevCourses => [...prevCourses, takenCourse]);
      await sendSelectedCourses([...selectedCourses, takenCourse]);
      event.target.value = ''; // Clear the input field after pushing the course
    }
  };

  const sendSelectedCourses = async (takenCourses) => {
    try {
      const response = await fetch('http://localhost:5001/selected-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ takenCourses }),
      });

      if (!response.ok) {
        throw new Error('Failed to send selected courses to the backend');
      }
    } catch (error) {
      console.error('Error sending selected courses to the backend:', error);
    }
  };

  return (
    <input onKeyDown={handleSelectChange} placeholder="Press Enter to add course"></input>
  );
}


function App() {

  return (
    <div>
      <h2>Welcome to Schedule-Gen!</h2>
      <PrimaryMajorMenu />
      <SecondaryMajorMenu />
      <ThirdMajorMenu />
      <MinorMenu />
      <CreditSlider/>
      <PrevTakenCourses />
      <button onClick={() => window.location.reload()}>Submit</button>
      <button onClick={handleAddGenEds}>Add General Education</button>
      <ResetButton />
        <div className='container'>
        <FetchData>
          {(backendData) =>
            backendData &&
            Object.keys(backendData).map((semester) => (
              <div key={semester}>
                <h3>{semester}</h3>
                <ul>
                  {Object.keys(backendData[semester]).map((course) => (
                    <li key={course}>{backendData[semester][course]}</li>
                  ))}
                </ul>
              </div>
            ))
          }
        </FetchData>
        </div> 
    </div>
  );
}

export default App;