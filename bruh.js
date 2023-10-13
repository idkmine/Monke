          this.encodePacket = function(packet){

            let first_encode = (function(packet) {
                for (var index, array = [], i= 0; i < packet.length; ++i)
                    array.push((index = packet.charCodeAt(i)) << 1 | index >>> 31);
                return array;
            }(JSON.stringify(packet)))
        
        
            let keys = {
                xor: 1,
                addr: 2,
                rem: 3,
                mul: 4
            }
        
            let random_shit = 48 + ~~(256 * Math.random());
        
            if(typeof first_encode !== "object"){
                return [];
            }
        
            let container = [...first_encode]
                container.push(random_shit)
        
                for (let i = 0x0; i < container.length - 0x1; i++)
                
                container[i] ^= keys.xor,
        
                keys.xor = keys.mul * (keys.xor + keys.addr) % keys.rem,
        
                container[i] += random_shit;
        
            return container
        
        }
        
        this.encoder = function(packet) {
            const encodedPacket = this.encodePacket(packet);
                return new Uint16Array(encodedPacket)
        }
