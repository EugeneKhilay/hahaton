/**
 * Created by Victor on 09.07.2016.
 */
$(function(){
    function MyViewModel() {
        this.people = [
            { name: 'Franklin', technology: 'html', caste: 'developer' },
            { name: 'Mario', technology: 'css', caste: 'developer' },
            { name: 'Eugene', technology: 'jquery', caste: 'developer' },
            { name: 'Sasha', technology: 'PS', caste: 'designer' },
            { name: 'Alina', technology: 'PS', caste: 'designer' },
            { name: 'Pasha', technology: 'PS', caste: 'designer' },
            { name: 'Larisa', technology: '?', caste: 'manager' },
            { name: 'Ianna', technology: '?', caste: 'manager' }
        ]
    }
    ko.applyBindings(new MyViewModel());
});