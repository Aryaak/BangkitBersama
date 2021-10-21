import React from 'react'
import { StyleSheet, View } from 'react-native'
import { CategoryItem } from '../../../components'
import CovidIcon from '../../../assets/icon/covid.svg'
import EkonomiIcon from '../../../assets/icon/ekonomi.svg'
import PanganIcon from '../../../assets/icon/pangan.svg'
import JasaIcon from '../../../assets/icon/jasa.svg'

const HelpCategory = ({ style, navigation }) => {
    return (
        <View style={[styles.wrapper, style]}>
            <CategoryItem onPress={() => navigation.navigate('Kategori', { category: 1 })} title="Covid 19" icon={<CovidIcon />} />
            <CategoryItem title="Ekonomi" onPress={() => navigation.navigate('Kategori', { category: 2 })} icon={<EkonomiIcon />} />
            <CategoryItem title="Pangan" onPress={() => navigation.navigate('Kategori', { category: 3 })} icon={<PanganIcon />} />
            <CategoryItem title="Jasa" onPress={() => navigation.navigate('Kategori', { category: 4 })} icon={<JasaIcon />} />
        </View>
    )
}

export default HelpCategory

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
