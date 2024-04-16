/****
 * 1. fork -> creates a new nodesjs vs8 process . Here you can do inter process communication -> 
 *          usecase. if you want the multiprocess nodejs server
 * 2. spawn -> create a new process it does not matter which kind, 
 *              Here you can do communication through streams-> It is usally used for long running process
 *              or the process that might need a lot of memory
 *          usecase : run a cron job / parallel memory heavy process / program that belongs to a different
 * 3. **`exec`:**
        - Executes a command in a shell (for example, Bash or Windows CMD).
    - It buffers the output and provides it when the process completes.
    - Best suited for short-lived processes that generate a small amount of data.
    - Useful for executing commands and getting the output back in a callback.
    - Not suitable for handling long-running processes or streaming large amounts of data due to the buffer limit.
* 4. **`execFile`:**
    - Similar to `exec`, but specifically for executing an executable file directly (as opposed to a command).
    - Allows specifying the file directly without going through a shell.
    - It’s generally more efficient than `exec` since it bypasses the shell.
 * 
 * 
 * 
 * ***/ 

const {spawn}=require("child_process");

spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["https://youtube.com","--incognito"]);



