/* Testing promises */

async function square(n) {
    // returns a promise
    return n * n
}

async function main() {
    await square(9)
    // extract result of promise
    .then((res) => {
        // if not null, print
        if (res) console.log(res)
    })
}

main()