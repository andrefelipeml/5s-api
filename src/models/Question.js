module.exports = (sequelize, DataTypes) => {  
    
	var Question = sequelize.define('Question', {
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING
		},
		sense: {
			type: DataTypes.INTEGER
		},
		description: {
			type: DataTypes.STRING
		}
	},
	{
		tableName: 'questions',
		timestamps: false, /* false para não criar colunas createdAt e updateAt no banco */
	})
    


	return Question
}
