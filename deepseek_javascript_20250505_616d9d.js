document.addEventListener('DOMContentLoaded', function() {
    // Simulation de connexion
    const loginForm = document.getElementById('loginForm');
    const dashboard = document.getElementById('dashboard');
    const connexionSection = document.getElementById('connexion');
    const payNowBtn = document.getElementById('payNow');
    
    // Données simulées
    const companyData = {
        tvaDue: 2450.75,
        nextPayment: '15/12/2023',
        paymentHistory: [
            { date: '15/10/2023', amount: 1890.50, status: 'Payé' },
            { date: '15/09/2023', amount: 2105.25, status: 'Payé' },
            { date: '15/08/2023', amount: 1755.00, status: 'Payé' }
        ]
    };
    
    // Gestion de la connexion
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Ici, normalement, vérification des identifiants via API
        // Pour cette démo, on simule une connexion réussie
        
        // Afficher le tableau de bord
        connexionSection.classList.add('hidden');
        dashboard.classList.remove('hidden');
        
        // Remplir les données
        document.getElementById('tvaDue').textContent = companyData.tvaDue.toFixed(2) + ' €';
        document.getElementById('nextPayment').textContent = companyData.nextPayment;
        
        // Remplir l'historique
        const historyTable = document.querySelector('#paymentHistory tbody');
        historyTable.innerHTML = '';
        
        companyData.paymentHistory.forEach(payment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${payment.date}</td>
                <td>${payment.amount.toFixed(2)} €</td>
                <td>${payment.status}</td>
            `;
            historyTable.appendChild(row);
        });
    });
    
    // Gestion du paiement
    payNowBtn.addEventListener('click', function() {
        // Simulation de l'IA qui calcule et paie la TVA
        alert('L\'IA a calculé votre TVA et effectué le paiement directement à l\'État.\nMontant: ' + companyData.tvaDue.toFixed(2) + ' €');
        
        // Mettre à jour l'historique
        const now = new Date();
        const paymentDate = `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`;
        
        companyData.paymentHistory.unshift({
            date: paymentDate,
            amount: companyData.tvaDue,
            status: 'Payé'
        });
        
        // Réinitialiser la TVA due
        companyData.tvaDue = 0;
        document.getElementById('tvaDue').textContent = '0.00 €';
        
        // Mettre à jour l'historique dans le tableau
        const historyTable = document.querySelector('#paymentHistory tbody');
        historyTable.innerHTML = '';
        
        companyData.paymentHistory.forEach(payment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${payment.date}</td>
                <td>${payment.amount.toFixed(2)} €</td>
                <td>${payment.status}</td>
            `;
            historyTable.appendChild(row);
        });
    });
});