import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const city1 = await prisma.city.create({
    data: {
      name: 'Berlin',
    },
  })

  const city2 = await prisma.city.create({
    data: {
      name: 'Hamburg',
    }
  })

  const city3 = await prisma.city.create({
    data: {
      name: 'Stuttgart',
    }
  })
  
  const company1 = await prisma.company.create({
    data: {
      name: 'Komi',
      logo: 'https://lh3.googleusercontent.com/proxy/3ZdCoHnCNX65bzDwkLuLf3Nwq7qbGthMqVv0xbGztPuKDhzXY5vNX_OcOSnalXLNbD43ljnwhQjIRTdKQ5GA8a9R_H7fidg81jR662M',
      cityId: city1.id,
    },
  })

  const company2 = await prisma.company.create({
    data: {
      name: 'Kone',
      logo: 'https://lh3.googleusercontent.com/proxy/thagNILBZB7GHfaxJ0J7zzlXQveuD9QuMChVSOJHonmEQ148y0kx-RPCYlMPc2y_pefaC5sIbJzz8ydFnvtximyNn4cmZT6fkQ',
      cityId: city2.id,
    },
  })

  const company3 = await prisma.company.create({
    data: {
      name: 'Tane',
      logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX///8AAADz8/P39/fd3d26urqxsbF6enrk5OTg4OCNjY1NTU0XFxf7+/sSEhJJSUmAgIBBQUG0tLTY2NiqqqpVVVWGhobBwcGPj49bW1u5ubkhISE9PT19fX3IyMgxMTGYmJgoKCgdHR2fn5/r6+ujYusfAAAEl0lEQVR4nO3diVIbMQwG4DoLWY4kEO4jUK73f8ZOEaVuvfb6kCwpo+8FsIbhjyQv2R8/jDHGGGOMMcYYY4wxxhh0i+W4/bkdlwP3QYh8jO6P8Yj7MBSunG/JfRx8L+5fL9wHwnbl/nfFfSRcR0GBzu3X3+L9RIX33IfCdDtRoHO33MdCtJmscLPmPheau8kCnbvjPhiWqZjZr7CZipm9CpvpmNmnsJmOmS/ch8MQi5m9CZvjZIHOHXMfsFk8ZoD6sEnFDNAeNqvZClfcR2xzM1ugczfch2wR72Z8mjubuZgBisPmMKtA5w65D1preM2s8FHrejHdzfhOuI9aJy9mgM6wuS6o8JT7sDVyYwYoDJv1a1GFr/rC5qSoQIVhUxIzQNsYdVpcobKwmR+aQqrGqGF+aAqtNIVNacwARWEzt5uJ0RM2Jd2M75r74LnKuhmfks5mnVwBJym5jaqLGaAibA4aCnTugPv4GWpjBigIm/qYAfLDprFA+bdROSvgNOEL4raYAbLDJm8FnCZ6QdwaM+CBu4y4dc3QFBLc2bTHDBAbNuW7mRipC+Ly3UyM0J3NA1qBzl1wFzNleESsUORtVMvQFBI4RuHFDJC3s8GLGSAubDBjBgjrbFBjBggLG6xuxieqs6ldAadJCpszkgrPuMv664KkQEGdTdVNUw4xt1EUMQOEhA3GbiZGxs4Gu5vxiehs8LsZn4DOZk1aoHP8Oxu6mAHsYUMZM+CSucK2m6YczLdROCvgNNbbKOqYAZxhc96lwnO+AuljBvB1NvQxA9jChmpoCjGNUWRDU4hpjKLuZnwsYUOzm4nh2NlQDk0hhjGqX8yA7mEzvHWu8K132PTpZnydw6ZvzIC+nQ3NCjit64K4d8yAjt+etejXzfhWi24V9uxmfN12Nr2GplCvsNmyVbjtUyBPzIAunc1Q/88G7TY9OhuumAEdwuaStcAeC+K+Q1OIfIzijBlAHDZ9VsBptAvi/kNT6ImyQO6YAZRh02sFnEa4IF5y1/aFbIwauCv7RtXZPHEX9o0obPiGphBN2HDsZmJIdjZSYgYQhA3r0BQiGKPG+Z/a1YhdoKSYAdg7G0kxA5DDRlbMANSwWciKGbDBXBBLGJpCiLdR8mIG4IXNjruUiB1WgeHbN6RAegsI001TDqTbKN4VcBpK2MjYzcRgjFF8N005EG6jJHYzvubORs5uJqZ1jJKzm4lpHKNkxwxoCxvum6YcTWOU9JgBDWEj4aYpR/1tlLTdTEx12GiIGVAbNvJ2MzGVnY2OmAFVYSO/m/HVdDZaYgZUhI2emAHlYaMnZkBxZ6MpZkDhzmbBfd4KZTsbXTEDisJGW8yAkrCRvZuJKehs+B/Pq5P/UJ/OX2HBL1HqRcy83Kuad+6DVnvPrFD+fi0m91kpjR+GIPcjcf8rxP2ezp5yvxO05kU/MuS+bkhj2/0p/+kMrX+I+b33B/dRK31kVyj42YSUohlY5iNCaYV3+vnvEJWi+C3tz1IfE5q2ey4t8HeNo5Yid2NNfZ+GhQZSvuXUGGOMMcYYY4wxxhhjjDHGGGOMMcYY+X4BpvhXXQ+XmZ0AAAAASUVORK5CYII=',
      cityId: city3.id,
    },
  })

  const specialty1 = await prisma.specialty.create({
    data: {
      name: 'Excavation',
    },
  })

  const specialty2 = await prisma.specialty.create({
    data: {
      name: 'Electrical',
    },
  })

  const specialty3 = await prisma.specialty.create({
    data: {
      name: 'Plumbing',
    },
  })

  await prisma.company.update({
    where: {
      id: company1.id,
    },
    data: {
      specialties: {
        set: [
          { id: specialty1.id },
        ],
      },
    },
  })

  await prisma.company.update({
    where: {
      id: company2.id,
    },
    data: {
      specialties: {
        set: [
          { id: specialty2.id },
          { id: specialty3.id },
        ],
      },
    },
  })

  await prisma.company.update({
    where: {
      id: company3.id,
    },
    data: {
      specialties: {
        set: [
          { id: specialty2.id },
        ],
      },
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })