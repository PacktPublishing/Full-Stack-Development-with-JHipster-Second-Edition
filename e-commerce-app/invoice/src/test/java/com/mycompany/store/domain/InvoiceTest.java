package com.mycompany.store.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.store.web.rest.TestUtil;

public class InvoiceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Invoice.class);
        Invoice invoice1 = new Invoice();
        invoice1.setId(1L);
        Invoice invoice2 = new Invoice();
        invoice2.setId(invoice1.getId());
        assertThat(invoice1).isEqualTo(invoice2);
        invoice2.setId(2L);
        assertThat(invoice1).isNotEqualTo(invoice2);
        invoice1.setId(null);
        assertThat(invoice1).isNotEqualTo(invoice2);
    }
}
