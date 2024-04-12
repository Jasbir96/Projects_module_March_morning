1. **Launch an EC2 Instance:**
   - Log in to your AWS Management Console.
   - Go to the EC2 dashboard.
   - Click on "Launch Instance".
   - Choose an Ubuntu AMI.
   - Select an instance type and configure other settings as needed.
   - Create or choose an existing key pair for SSH access.
   - Launch the instance.
2. asssociating you static IP address to your machine [public static ip address]
3. **Update Ubuntu:**
   - Once connected to the instance, update the package lists for upgrades and install new versions of software:
     ```
     sudo apt update
     sudo apt upgrade
     ```
4.  **Install Node.js:**
   - Install Node.js and npm using the following commands:
     ```
     curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
     sudo apt-get install -y nodejs
     ```

5. **Create Your Express Application:**
   - Create a new directory for your project and navigate into it:
     ```
     mkdir my-express-app
     cd my-express-app
     ```
   - Initialize a new Node.js project:
     ```
     npm init -y
     ```
   - Install Express:
     ```
     npm install express
    ```
6. YOu need update the incoming rules through security group

7. reverse proxy -> ngnix -> 3000-> ip address [reverse proxy]
8. we need to get -> domain -> ip address  [domain]
9. you have to generate ssl certficate -> [ssl]