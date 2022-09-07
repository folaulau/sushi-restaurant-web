const Calculator = {

    calculateCartTotalItemCount: (countDatabase) => {
        let total = 0;

        for (const prop in countDatabase) {
            total += parseInt(countDatabase[prop])
        }

        return total;
        
    }
}

export default Calculator;