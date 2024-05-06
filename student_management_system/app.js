#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    static counter = 10000;
    name;
    id;
    courses;
    totalBalance;
    constructor(names) {
        this.name = names;
        this.id = Student.counter++;
        this.courses = [];
        this.totalBalance = 50000;
    }
    enrollCourse(course) {
        this.courses.push(course);
    }
    viewBalance() {
        console.log(chalk.yellow(`this is your total balance ${this.totalBalance}`));
    }
    payAmount(amount) {
        this.totalBalance -= amount;
        console.log(chalk.italic.gray(`${amount} fees paid successfully for ${this.courses} `));
    }
    viewStatus() {
        console.log(chalk.bold.greenBright.italic(`Name ${this.name}`));
        console.log(chalk.bold.greenBright.italic(`Id ${this.id}`));
        console.log(chalk.bold.greenBright.italic(`Courses ${this.courses}`));
        console.log(chalk.bold.greenBright.italic(`Balance ${this.totalBalance}`));
    }
}
class studentManager {
    students;
    constructor() {
        this.students = [];
    }
    //Method to add new student
    addStudents(name) {
        let studentN = new Student(name);
        this.students.push(studentN);
        console.log(chalk.bold.gray.italic(`Student: ${name} added successfully Student Id: ${studentN.id}`));
    }
    //Method to enroll a student in a course
    enrollStudent(studentId, course) {
        let student = this.findStudent(studentId);
        if (student) {
            student.enrollCourse(course);
            console.log(chalk.bold.gray.italic(`${student.name} enrolled in ${course} Successfully`));
        }
    }
    //method to veiw a student balance
    veiwStudentBalance(studentId) {
        let student = this.findStudent(studentId);
        if (student) {
            student.viewBalance();
        }
        else {
            console.log(chalk.italic.red(`student not found please enter a correct student id`));
        }
    }
    //Method to pay student fees
    payStudentFees(studentId, amount) {
        let student = this.findStudent(studentId);
        if (student) {
            student.payAmount(amount);
        }
        else {
            console.log(chalk.italic.red(`student not found please enter a correct student id`));
        }
    }
    //Method to display student status
    showStudentStatus(studentId) {
        let student = this.findStudent(studentId);
        if (student) {
            student.viewStatus();
        }
        else {
            console.log(chalk.italic.red(`student not found please enter a correct student id`));
        }
    }
    // Method to find a Student bu student id
    findStudent(studentId) {
        return this.students.find((std) => std.id === studentId);
    }
}
// Main Function to run the programe
async function main() {
    console.log(chalk.bold.cyan.italic("<<<", "-".repeat(50), ">>>"));
    console.log(chalk.bold.yellow.italic(`Welcome to "Moiz Ahmed Shaikh": Student Management System`));
    console.log(chalk.bold.cyan.italic("<<<", "-".repeat(50), ">>>"));
    let manage = new studentManager();
    //using while loop to keep programe running
    while (true) {
        let choice = await inquirer.prompt({
            name: "choices",
            message: "Choose an Option",
            type: "list",
            choices: [
                "Add Student",
                "Enroll Student",
                "View Balance",
                "Pay Student Fess",
                "Show Student Status",
                "Exit",
            ],
        });
        //using Switch Case statement for user choise
        switch (choice.choices) {
            case "Add Student":
                let input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a student Name",
                    },
                ]);
                manage.addStudents(input.name);
                break;
            case "Enroll Student":
                let courseInput = await inquirer.prompt([
                    {
                        name: "id",
                        type: "number",
                        message: "Enter a student Id",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a course name",
                    },
                ]);
                manage.enrollStudent(courseInput.id, courseInput.course);
                break;
            case "View Balance":
                let balance = await inquirer.prompt([
                    {
                        name: "id",
                        type: "number",
                        message: "Enter a student Id",
                    },
                ]);
                manage.veiwStudentBalance(balance.id);
                break;
            case "Pay Student Fess":
                let payFess = await inquirer.prompt([
                    {
                        name: "id",
                        type: "number",
                        message: "Enter a student Id",
                    },
                    {
                        name: "amount",
                        type: "input",
                        message: "Enter Amount",
                    },
                ]);
                manage.payStudentFees(payFess.id, payFess.amount);
                break;
            case "Show Student Status":
                let studentStatus = await inquirer.prompt([
                    {
                        name: "id",
                        type: "number",
                        message: "Enter a student Id",
                    },
                ]);
                manage.showStudentStatus(studentStatus.id);
                break;
            case "Exit":
                console.log(chalk.bold.cyanBright(`You are Exit..`));
                process.exit();
        }
    }
}
// Calling the programe
main();
