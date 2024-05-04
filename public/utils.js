function calculateAverageGrade(grades) {
    if (grades.length === 0) {
      return 0; 
    }
    const totalGrade = grades.reduce((sum, grade) => sum + grade, 0); // Суммирование всех оценок
    return totalGrade / grades.length; // Расчет среднего балла
  }
  
  module.exports = calculateAverageGrade;
