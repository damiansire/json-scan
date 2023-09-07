const { expect } = require('chai');
const { getByTag, _getTagRecursive } = require("../../src/libs/gets")


describe("getByTag", () => {
    describe("se pasa como parametro algo que no es un objeto o una date", () => {

    })

    describe("se pasa como parametro un objeto simple", () => {
        it("Si el atributo no esta, se devuelve un array vacio", () => {
            const json = { name: "Damian" }
            const result = getByTag(json, "surname");
            expect(result).to.be.an('array').that.is.empty;
        })
        it("Si el atributo  aparece una sola vez, se devuelve un array con un objeto que es ese atributo y el valor", () => {
            const json = { name: "Damian" }
            const result = getByTag(json, "name");
            expect(result).to.be.an('array').that.has.lengthOf(1);
            expect(result[0]).to.deep.equal({ name: "Damian" });
        })
        it("Si el atributo aparece varias veces, se devuelve un array con un objeto que contiene el atributo y sus contenedores", () => {
            const json = {
                "name": "Damian",
                "surname": "Sire",
                "venue": {
                    "name": "Google",
                    "address": "dummy"
                },
                "family": {
                    "mother": {
                        "name": "dummy"
                    }
                }
            }
            const expectedJson = {
                "name": "Damian",
                "venue": {
                    "name": "Google",
                },
                "family": {
                    "mother": {
                        "name": "dummy"
                    }
                }
            }
            const result = getByTag(json, "name");
            expect(result).to.be.an('array').that.has.lengthOf(1);
            expect(result[0]).to.deep.equal(expectedJson);
        })


        it("Cuando el atributo anidado se encuentra en un array, se devuelve el array que contiene los atributos anidados", () => {
            const json = {
                "name": "Damian",
                "surname": "Sire",
                "venue": {
                    "name": "Google",
                    "address": "dummy"
                },
                "family": [
                    {
                        "name": "Persona1",
                        "surname": "Apellido1",
                        "venue": {
                            "name": "Lugar1",
                            "address": "Dirección1"
                        },
                        "family": []
                    },
                    {
                        "name": "Persona2",
                        "surname": "Apellido2",
                        "venue": {
                            "name": "Lugar2",
                            "address": "Dirección2"
                        },
                        "family": []
                    }
                ]
            }
            const expectedJson = {
                "name": "Damian",
                "venue": {
                    "name": "Google",
                },
                "family": [
                    {
                        "name": "Persona1",
                        "venue": {
                            "name": "Lugar1",
                        },
                    },
                    {
                        "name": "Persona2",
                        "venue": {
                            "name": "Lugar2",
                        },
                    }
                ]
            }
            const result = getByTag(json, "name");
            expect(result).to.be.an('array').that.has.lengthOf(1);
            expect(result[0]).to.deep.equal(expectedJson);
        })

    })

    describe("se pasa como parametro un array de objetos", () => {

    })
})