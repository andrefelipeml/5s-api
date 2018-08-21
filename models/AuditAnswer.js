module.exports = (sequelize, DataTypes) => {  
    
    var AuditAnswer = sequelize.define('AuditAnswer', {
        id: {
			primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        audits_id: {
            type: DataTypes.INTEGER
        },

        created_date: {
            type: DataTypes.DATEONLY
        }
    },
    {
        classMethods: {
            associate : function(models) { },
        },

        tableName: 'audit_answers' 
        
    });

    AuditAnswer.associate = (models) => {
        AuditAnswer.belongsTo(models.Audit, { foreignKey: 'audits_id'});
        AuditAnswer.belongsTo(models.Question, { foreignKey: 'questions_id'});
    };
    

    return AuditAnswer;
};
